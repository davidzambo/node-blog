const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trd');
const Schema = mongoose.Schema;

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
    this.slug = this.title.toLowerCase().replace(/\s/g, '-');
    next();
});

module.exports = mongoose.model('Post', postSchema)

