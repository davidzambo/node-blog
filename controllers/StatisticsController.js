const Statistics = require('../models/StatisticsModel');

module.exports = {
    index(req, res){
        Statistics.find()
            .sort({season: -1})
            .exec( (err, statistics) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                res.status(200).json({statistics});
            })
    },

    create(req, res){
        const statistic = new Statistics(req.body);

        statistic.save( err => {
            if (err) console.error(err);
            Statistics.find()
                .sort({season: -1})
                .exec( (err, statistics) => {
                    if (err) console.error(err);
                    res.status(200).json({statistics})
                })
        });
    },

    show(req, res){
        Statistics.findOne({_id: req.params.id})
            .exec( (err, statistics) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                res.status(200).json({statistics});
            });
    },

    update(req, res){
        const update = {},
            stat = req.body;

        for (prop in stat){
            if (!(prop === '_id' || prop === 'createdAt'))
                update[prop] = stat[prop];
        };

        Statistics.findOneAndUpdate({_id: req.body._id}, {$set: update}, (err, statistic) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});
                res.status(200).json({statistic});
            })
    },

    destroy(req, res){
        Statistics.findOneAndRemove({_id: req.body._id}, err => {
            if (err) return res.status(400)
                .json({err, message: "Az adatbázis nem elérhető!"});

            Statistics.find()
                .sort({season: -1})
                .exec( (err, statistics) => {
                    if (err) return res.status(400)
                        .json({err, message: "Az adatbázis nem elérhető!"});
                    return res.status(200).json({statistics});
                })
        })
    },
};