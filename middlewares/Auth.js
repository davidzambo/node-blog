const LoginAttempts = require('../models/LoginAttemptModel');

module.exports = {
    isAuthenticated(req, res, next){
        LoginAttempts.findOne({result: true})
            .sort({date: -1})
            .exec((err,login) => {
                if (login.ip === req.ip && login.token === req.cookies.trdToken && login.worker === req.headers['user-agent']){
                    return next();
                }
                res.status(401);
            })
    }
}