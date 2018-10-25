const mongoose = require('mongoose');
const slug = require('slug');
mongoose.connect(process.env.DB_ADDRESS, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;
const imageSchema = require('./ImageModel');

const gallerySchema = new Schema({
    title: {type: String, default: 'egyéb'},
    slug: {type: String},
    description: {type: String},
    images: [imageSchema],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
});

gallerySchema.pre('save', function (next){
    this.slug = slug(this.title).toLowerCase();
    next();
});

module.exports = mongoose.model('Gallery', gallerySchema);