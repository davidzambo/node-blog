const NewsLetter = require('../models/NewsletterModel');
const api_key = process.env.MAILGUN_API_KEY;
const validation_key = process.env.MAILGUN_VALIDATION_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const Mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const Validator = require('mailgun-js')({apiKey: validation_key, domain: domain});
const List = Mailgun.lists('trd@www.dcmf.hu');

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
                console.log(body);

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
                       return res.status(201).json({message: 'A feliratkozás megerősítését rögzítettük!'});
                    });
                } else {
                    return res.status(304).json({error: "Valami hiba történt!"});
                }
            });
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

    send(req, res){
        const data = {
            from: "Tóth Róbert Dávid <a@dcmf.hu>",
            to: req.body.to,
            subject: req.body.subject,
            html: req.body.message
        };

        Mailgun.messages().send(data, (err, body) => {
            if (err) console.error(err);
            console.log(body);
        })

    }
};

const SENDER = "Tóth Róbert Dávid <info@tothrobertdavid.eu>"

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