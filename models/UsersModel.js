const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trd');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    date: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
    this.password = this.password.toLowerCase().replace(/\s/g, '-');
    next();
});

module.exports = mongoose.model('registeredUser', userSchema, 'registeredUsers')

