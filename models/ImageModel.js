const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    album: {type: String, default: 'egyéb', required: true},
    thumbnail: {type: String, required: true, unique: true},
    display: {type: String, required: true, unique: true},
    isCover: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Image', imageSchema);