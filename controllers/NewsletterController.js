const api_key = process.env.MAILGUN_API_KEY;
const validation_key = process.env.MAILGUN_VALIDATION_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const Mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const Validator = require('mailgun-js')({apiKey: validation_key, domain: domain});
const List = Mailgun.lists('trd@www.dcmf.hu');

module.exports = {
    subscribe(req, res) {
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