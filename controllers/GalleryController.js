const Gallery = require('../models/GalleryModel');
const fs = require('fs');
const path = require('path');

module.exports = {
    show(req, res){
        const filter = {};
        if (req.query.slug){
            filter.slug = req.query.slug;
        }
        Gallery.find(filter)
            .exec((err, galleries) => {
                if (err) console.error(err);
                console.log(galleries.length);
                res.status(200)
                    .json({galleries});
            })
    },

    create(req, res){
        Gallery.findOne({title: req.body.title}, (err, gallery) => {
            if (err) console.error(err);
            if (!gallery) {
                gallery = new Gallery({
                    title: req.body.title,
                    description: req.body.description,
                });
            }
            for (let file of req.files) {
                const filename = file.filename;
                let img = {
                    filename: filename,
                    thumbnail: filename.replace('original', 'thumbnail'),
                    display: filename.replace('original', 'display')
                };
                gallery.images.push(img);
            };

            gallery.save(err => {
                if (err) console.error(err);
                Gallery.find()
                    .exec((err, galleries) => {
                        if (err) console.error(err);
                        res.status(201)
                            .json({galleries});
                    });
            })
        });
    },

    update(req, res){
        Gallery.findOne({_id: req.body._id})
            .exec((err, gallery) => {
                if (err) console.log(err);
                gallery.title = req.body.title;
                gallery.description = req.body.description;
                for (let file of req.files){
                    const filename = file.filename;
                    const img = {
                        filename,
                        thumbnail: filename.replace('original', 'thumbnail'),
                        display: filename.replace('original', 'display')
                    };
                    gallery.images.push(img);
                }

                gallery.save(err => {
                   if (err) console.error(err);
                   Gallery.find()
                       .exec((err, galleries) => {
                           if (err) console.error(err);
                           res.status(201)
                               .json({galleries});
                       })
                });
            })
    },

    destroy(req, res){
        Gallery.findOne({_id: req.body._id}, (err, gallery) => {
            if (err) console.error(err);
            if (!gallery){
                return res.json({error: 'Undefined gallery'});
            }

            // delete just one image
            if (req.body.image && req.body.image._id){
                gallery.images.id(req.body.image._id).remove();
                gallery.save(err => {
                    if (err) console.error(err);
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '../', 'public/images', req.body.image.filename));
                        fs.unlinkSync(path.resolve(__dirname, '../',  'public/images', req.body.image.thumbnail));
                        fs.unlinkSync(path.resolve(__dirname, '../',  'public/images', req.body.image.display));
                        Gallery.findOne({_id: req.body._id})
                            .exec((err, gallery) => {
                                if (err) console.error(err);
                                res.status(200)
                                    .json({gallery});
                            });
                    } catch (e){
                        console.log(e);
                    }
                })
            // delete whole album
            } else {
                gallery.images.forEach(img => {
                    try {
                        fs.unlinkSync(path.resolve(__dirname, '../', 'public/images', img.filename));
                        fs.unlinkSync(path.resolve(__dirname, '../', 'public/images', img.thumbnail));
                        fs.unlinkSync(path.resolve(__dirname, '../', 'public/images', img.display));
                    } catch (e){
                        console.log(e);
                    }
                });
                gallery.remove(err => {
                    if (err) console.error(err);
                    Gallery.find()
                        .exec((err, galleries) => {
                            if (err) console.error(err);
                            res.status(200)
                                .json({galleries});
                        });
                });
            }

        })
    }
}