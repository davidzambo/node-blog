const Match = require('../models/MatchModel');

module.exports = {

    index(req, res) {
        Match.find()
            .sort({matchDate: 1})
            .exec((err, matches) => {
                if (err) console.error(err);
                res.status(200).json({matches});
            });
    },

    create(req, res) {
        const match = new Match(req.body);
        console.log(match);
        match.save(err => {
            if (err) {
                console.error(err);
            }
            Match.find()
                .sort({date: 1})
                .exec((err, matches) => {
                    if (err) {
                        console.error(err);
                    }
                    res.status(200).json({matches});
                })
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
        Match.findOneAndUpdate({_id: req.body.id}, req.body, (err, match) => {
            if (err) {
                console.error(err);
            }
            res.status(201).json({match});
        })
    },

    destroy(req, res) {
        console.log(req.body);
        //
        Match.findOne({_id: req.body._id}, (err, match) => {
            if (err) console.error(err);
            console.log(match);
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