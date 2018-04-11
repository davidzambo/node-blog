const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;

const newsLetterSchema = new Schema({
    email: {type: String, required: true, unique: true},
    lastName: {type: String, required, true,},
    approved: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});