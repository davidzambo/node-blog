const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;
const slug = require('slug');
const moment = require('moment');

const postSchema = new Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, lowercase: true },
    tags: { type: [String], required: true },
    body: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    meta: {
        views: { type: Number, default: 0 },
    }
});

postSchema.pre('save', function (next) {

    this.slug = slug(moment().format('YYMMDD') + '-' + this.title);
    next();
});

module.exports = mongoose.model('Post', postSchema);

