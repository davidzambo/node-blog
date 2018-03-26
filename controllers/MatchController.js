const Match = require('../models/MatchModel');

module.exports = {

    index(req, res){
        Match.find()
            .sort({matchDate: 1})
            .exec( (err, matches) => {
                if (err) console.error(err);
                res.status(200).json({matches});
            });
    },

    create(req, res){
        const match = new Match(req.body);
        console.log(match);
        match.save( err => {
            if (err) {console.error(err);}
            Match.find()
                .sort({date: 1})
                .exec( (err, matches) => {
                    if (err) {console.error(err);}
                    res.status(200).json({matches});
                })
        })
    }
}