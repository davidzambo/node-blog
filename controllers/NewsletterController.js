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
        }, (error, newsLetter) => {
            if (error) {
                if (error.code === 11000){
                    return res.status(409)
                        .json({
                            message: "Ez az emailcím már szerepel a regisztrált hírlevél olvasók között!",
                            error,
                        });
                } else {
                    return res.status(417).json({error, message: 'Hiba történt a feliratkozás során!'});
                }
            }

            Mailgun.messages().send(messages.optIn(req.body.email, newsLetter._id), (err, body) => {
                if (err) return res.status(409).json({
                    err,
                    message: 'Hiba történt a hírlevél feliratkozás során!'
                });
                res.status(201)
                    .json({message: "A feliratkozás véglegesítéséhez szükséges email kiküldtük az email címedre!"});
            });
        })
    },

    approve(req, res){
        NewsLetter.findOne({
            _id: req.query.token,
            email: req.query.email
        })
            .exec((err, newsLetter) => {
                if (err) return res.status(417)
                    .json({err, message: "Hiba történt az adatbázis elérés során!"});
                if (newsLetter){
                    if (newsLetter.approved){
                        return res.status(409).json({message: 'Ön már megerősítette az email címét!'});
                    }
                    newsLetter.approved = true;
                    newsLetter.save(err => {
                       if (err) return res.status(417)
                           .json({err, message: "Hiba történt az adatbázisba mentés során!"});

                        const newSubscriber = {
                            subscribed: true,
                            name: newsLetter.firstName,
                            address: newsLetter.email
                        };

                        List.members().create( newSubscriber, err => {
                            if (err) return res.status(417)
                                .json({err, message: "Hiba történt a hírlevél feliratkozás megerősítése során!"});
                            return res.status(201).json({message: 'A feliratkozás megerősítését rögzítettük!'});
                        });

                    });
                } else {
                    return res.status(304).json({error: "Az email cím nem szerepel a rendszerünkben!"});
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

    sendNotification(data){
        const message = {
            from: SENDER,
            to: MAILLIST,
            subject: `Új bejegyzést írtam az oldalamra ${data.title} címmel`,
            html: messages.newPost(data)
        };

        Mailgun.messages().send(message, err => {
            if (err) console.error(err);
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