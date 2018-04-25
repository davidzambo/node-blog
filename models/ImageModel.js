const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;

module.exports = new Schema({
    filename: {type: String, required: true},
    thumbnail: {type: String, required: true},
    display: {type: String, required: true},
    cover: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});
