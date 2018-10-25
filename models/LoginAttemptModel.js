const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const loginAttemptSchema = new Schema({
    ip: {type: String, required: true},
    email: { type: String },
    password: { type: String  },
    result: {type: Boolean, required: true},
    token: {type: String },
    worker: {type: String, required: true},
    date: { type: Date, default: Date.now },
});

// loginAttemptSchema.pre('save', function (next) {
//     this.password = this.password.toLowerCase().replace(/\s/g, '-');
//     next();
// });

module.exports = mongoose.model('loginAttempt', loginAttemptSchema, 'loginAttempts');

