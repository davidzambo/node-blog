const uuidv4 = require('uuidv4');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;

const newsLetterSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    approved: {type: Boolean, default: false},
    token: {type: String, default: uuidv4()},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Newsletter', newsLetterSchema);