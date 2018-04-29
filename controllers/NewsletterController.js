const NewsLetter = require('../models/NewsletterModel');
const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const Mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const SENDER = process.env.SENDER;
const MAILLIST = process.env.MAILLIST;
const List = Mailgun.lists(MAILLIST);

module.exports = {
    subscribe(req, res) {
        NewsLetter.create({
            email: req.body.email,
            firstName: req.body.firstName
        }, (err, newsLetter) => {
            if (err) {
                console.error(err);
                if (err.code === 11000){
                    return res.status(304)
                        .json({message: "Error"});
                }
            }

            Mailgun.messages().send(messages.optIn(req.body.email, newsLetter._id), (err, body) => {
                if (err) console.error(err);
                res.status(201)
                    .json({message: "Ok"});
            });
        })
    },

    approve(req, res){
        NewsLetter.findOne({
            _id: req.query.token,
            email: req.query.email
        })
            .exec((err, newsLetter) => {
                if (err) console.error(err);
                if (newsLetter){
                    if (newsLetter.approved){
                        return res.status(200).json({message: 'Ön már megerősítette az emailcímét!'});
                    }
                    newsLetter.approved = true;
                    newsLetter.save(err => {
                       if (err) console.error(err);

                        const newSubscriber = {
                            subscribed: true,
                            name: newsLetter.firstName,
                            address: newsLetter.email
                        };

                        List.members().create( newSubscriber, (err, data) => {
                            if (err) console.error(err);
                            console.log(data);
                            return res.status(201).json({message: 'A feliratkozás megerősítését rögzítettük!'});
                        });

                    });
                } else {
                    return res.status(304).json({error: "Valami hiba történt!"});
                }
            });
    },

    unsubscribe(req, res){
        NewsLetter.findOne({email: req.body.email})
            .exec((err, reader) => {
                if (err) return res.status(417).json(err);
                List.members(req.body.email).delete((err, mailgunResponse) => {
                    if (err) return res.status(404)
                        .json({message: 'Ez az emailcím nincs a hírlevélolvasóim között!', err});
                    reader.remove(err => {
                        if (err) return res.status(400).json(err);
                        res.status(201).json({message: 'Sikeresen leiratkoztál a levelezőlistámról!', mailgunResponse});
                    })
                })
            })
    },

    remove(req, res){
        NewsLetter.findOne({
            _id: req.query.token,
            email: req.query.email
        })
        .exec((err, newsLetter) => {
            if (err) console.error(err);
            newsLetter.remove(err => res.status(200));
        });
    },

    send(data, next){
        const message = {
            from: SENDER,
            to: data.email,
            subject: data.subject,
            html: data.message
        };

        Mailgun.messages().send(message, (err, body) => {
            if (err) console.error(err);
            console.log(body);
            next()
        })
    },

    sendNotification(data){
        const message = {
            from: SENDER,
            to: MAILLIST,
            subject: `Új bejegyzést írtam az oldalamra ${data.title} címmel`,
            html: messages.newPost(data)
        };

        Mailgun.messages().send(message, (err, body) => {
            if (err) console.error(err);
            console.log(body);
        })
    },

};


const messages = {
    optIn(email, token){
        let message = '';
        message += '<h1>Feliratkozás megerősítése</h1>';
        message += '<p>Először is szereném megköszönni, hogy feliratkoztál a hírlevelemre!<p>';
        message += `<p>A feliratkozásod véglegesítéséhez már csak annyi teendőd van, hogy <a href="https://www.tothrobertdavid.eu/feliratkozas?email=${email}&token=${token}">erre</a> a linkre kattitva megerősíted az email címedet!</p>`;
        message += 'Üdvözlettel: Tóth Róbert Dávid';
        return {
            from: SENDER,
            to: email,
            subject: 'Hírlevél feliratkozás megerősítése',
            html: message
        }
    },

    newPost(post){
        let message = '';
        message += `<h2>Új bejegyzés: ${post.title}</h2>`;
        message += post.body.slice(0,400)+'...';
        message += `<p>A teljes cikket <a href="https://www.tothrobertdavid.eu/bejegyzesek/${post.slug}">ide</a> kattintva tudod elolvasni!</p>`;
        message += '<p>Üdvözlettel:<br/>Tóth Róbert Dávid</p>';

        return message;
    }
}
/*
* Newsletter.findOne({email: req.body.email}, (err, subscribed) => {
            if (err) console.error(err);

            if (subscribed) {
                return res.status(400).json({error: 'Ezzel az email címmel már regisztrált hírlevelemre!'});

            } else {
                Mailgun.validate(req.body.email, (err, body) => {
                    if (err) console.error(err);
                    console.log(body);

                    if (body.is_valid) {
                        const newsletter = new Newsletter({
                            firstName: req.body.firstName,
                            email: req.body.email
                        });

                        newsletter.save(err => {
                            if (err) console.error(err);
                            return res.status(200).json({message: 'A feliratkozás érvényesítéséhez szükséges emailt elküldtük a megadott email címre! !'});

                        });
                    } else {

                    }
                });
            }

        });*/

/**    subscribe(req, res) {
        Validator.validate(req.body.email, (err, body) => {
           if (err) console.error(err);

           if (body.is_valid) {
               const newSubscriber = {
                   subscribed: true,
                   name: req.body.firstName,
                   address: req.body.email
               };

               List.members().create( newSubscriber, (err, data) => {
                   if (err) console.error(err);
                   console.log(data);
                   if (data.member){
                       res.status(201).json({message: 'Sikeresen feliratkozott a hírlevelemre'});
                   } else {
                       res.status(400).json({message: 'Már regisztrált email cím'});
                   }
               });
           } else {
               res.status(400).json({message: 'Érvénytelen email cím!'});
           }
        });
    },
 */