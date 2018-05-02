const Match = require('../models/MatchModel');
const Post = require('../models/PostModel');
const moment = require('moment');

module.exports = {

    index(req, res) {
        Match.find()
            .sort({matchDate: 1})
            .exec((err, matches) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                res.status(200).json({matches});
            });
    },

    create(req, res) {
        const match = new Match(req.body);
        match.save(err => {
            if (err) return res.status(400)
                .json({err, message: "Az adatbázis nem elérhető!"});
            const post = new Post({
                title: `${moment(req.body.matchDate).locale('hu').format('YYYY. MMMM Do')} ${req.body.team} - ${req.body.vsTeam} mérkőzés!`,
                tags: 'meccs',
                category: 'handball',
                body: '',
            });
            post.body += `<p>Ellenfél: ${req.body.vsTeam}</p>`;
            post.body += `<p>Időpont: ${moment(req.body.matchDate).locale('hu').format('YYYY. MMMM Do HH:mm')}</p>`;
            post.body += `<p>Helyszín: ${req.body.city} ${req.body.address}</p>`;
            post.body += `<p>Korosztály: ${req.body.ageGroup}</p>`;
            post.body += `<p>Liga: ${req.body.league}</p>`;
            post.save(err => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                Match.find()
                    .sort({date: 1})
                    .exec((err, matches) => {
                        if (err) return res.status(400)
                            .json({err, message: "Az adatbázis nem elérhető!"});
                        res.status(200).json({matches});
                    })
            });
        })
    },

    show(req, res) {
        Match.findOne({_id: req.params.id}).exec((err, match) => {
            if (err) {
                console.error(err);
            }
            res.status(200).json({match});
        })
    },

    update(req, res) {
        Match.findOneAndUpdate({_id: req.body._id}, req.body, (err, match) => {
            if (err) {
                console.error(err);
            }
            res.status(201).json({match});
        })
    },

    destroy(req, res) {
        Match.findOne({_id: req.body._id}, (err, match) => {
            if (err) console.error(err);
            match.remove(err => {
                if (err) console.error(err);
                Match.find()
                    .sort({matchDate: 1})
                    .exec((err, matches) => {
                        if (err) console.error(err);
                        res.status(200).json({matches});
                    })
            });
        })
    }

}