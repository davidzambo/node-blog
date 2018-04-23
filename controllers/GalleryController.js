const Gallery = require('../models/GalleryModel');
const imageSchema = require('../models/ImageModel');
const ImageController = (require('./ImageController'));


module.exports = {
    show(req, res){
        const filter = {};
        if (req.query.slug){
            filter.slug = req.query.slug;
        }
        Gallery.find(filter)
            .exec((err, galleries) => {
                if (err) console.error(err);
                res.status(200)
                    .json({galleries});
            })
    },

    create(req, res){
        Gallery.findOne({title: req.body.gallery}, (err, gallery) => {
            if (err) console.error(err);
            if (!gallery) {
                gallery = new Gallery({
                    title: req.body.gallery,
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
                res.status(201)
                    .json({message: 'Gallery saved successfully!'});
            })

        });

    },
}