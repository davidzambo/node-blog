const User = require('../models/UsersModel');
const passwordHash = require('password-hash');
const LoginAttempt = require('../models/LoginAttemptModel');

module.exports = {
    checkUser(req, res) {
        // res.json({ request: req.body });
        let limit = 35;
        LoginAttempt.find({ip: req.ip})
            .limit(limit)
            .sort({date: -1})
            .exec((err, loginAttempts) => {
                let canTryLogin = false;
                if (loginAttempts[limit - 1] == undefined) {
                    canTryLogin = true;
                }
                if (!canTryLogin) {
                    for (let i = 0; i < 5; i++) {
                        if (loginAttempts[i].result) {
                            canTryLogin = true;
                            break;
                        }
                    }
                }
                if (!canTryLogin) {
                    const now = new Date();
                    let restrictedUntil = new Date(loginAttempts[limit - 1].date);
                    if (restrictedUntil.getTime() + (24 * 60 * 60 * 1000) < now.getTime()) {
                        canTryLogin = true;
                    }
                }

                if (canTryLogin) {

                    const loginAttempt = new LoginAttempt({
                        ip: req.ip,
                        email: req.body.email,
                        password: req.body.password
                    });
                    User.findOne({email: req.body.email})
                        .exec((err, user) => {
                            if (err) console.error(err);
                            if (user === null) {
                                loginAttempt.result = false;
                                loginAttempt.save();
                                res.status(206).json({error: 'A megadott email cím nem megfelelő!'});
                            } else if (passwordHash.verify(req.body.password, user.password )) {

                                const token = passwordHash.generate(String(new Date().getTime()));

                                loginAttempt.token = token;
                                loginAttempt.result = true;
                                loginAttempt.save();
                                res.status(202).json({token});
                            } else {
                                loginAttempt.result = false;
                                loginAttempt.save();
                                res.status(206).json({error: 'A megadott jelszó nem megfelelő!'});
                            }
                        })
                } else {
                    res.status(206).json({error: 'Sikertelen bejelentkezési kísérletei miatt 24 órára blokkoltuk az ip címét!'});
                }
            });
    }
}