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
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});;
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
                            if (err) return res.status(400)
                                .json({err, message: "Az adatbázis nem elérhető!"});;
                            if (user === null) {
                                loginAttempt.result = false;
                                loginAttempt.save();
                                res.status(206).json({error: 'A megadott email cím nem megfelelő!'});
                            } else if (passwordHash.verify(req.body.password, user.password )) {

                                const token = passwordHash.generate(String(new Date().getTime()));

                                loginAttempt.token = token;
                                loginAttempt.result = true;
                                loginAttempt.worker = req.headers['user-agent'];
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
    },

    update(req, res){
        User.findOne()
            .exec((err, user) => {
                if (err) return res.status(400)
                    .json({err, message: "Az adatbázis nem elérhető!"});;
                if (passwordHash.verify(req.body.oldPassword, user.password)){
                    if (req.body.newPassword !== req.body.newPasswordConfirm) {
                        return res.status(206).json({message: 'A megerősítő jelszó nem egyezik meg az új jelszóval'});
                    }
                    user.password = passwordHash.generate(req.body.newPassword);
                    user.save(err => {
                        if (err) console.error(err);
                        res.status(202).json({message: 'A jelszavát sikeresen frissítettük!'});
                    })
                } else {
                    res.status(401).json({message: 'A megadott jelszó nem megfelelő'});
                }
            })
    }
}