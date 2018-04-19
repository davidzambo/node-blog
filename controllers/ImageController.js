const Image = require('../models/ImageModel');
const Helper = require('../helpers');
const path = require('path');
const fs = require('fs');

module.exports = {
    async create(req, index = 0, next = module.exports.create) {
        const baseFile = path.resolve(__dirname, '../', req.files[index].path);
        const thumbnail = await Helper.imgResizer(baseFile, 200, 'thumbnail');
        const display = await Helper.imgResizer(baseFile, 1350, 'display');
        const image = new Image({
            album: req.body.album,
            thumbnail: './public/images/'+thumbnail,
            display: './public/images/'+display
        });
        image.save(err => {
            if (err) console.error(err);
            fs.unlink(baseFile, err => {
                if (err) console.error(err);
                if (index < req.files.length - 1) {
                    next(req, ++index, next);
                }
            })
        })
        // if (index < arr.length - 1)
        // next(arr, ++index, next);
        // const display = await Helper.imgResizer(__dirname+'/'+req.files[0].path, 200, 'display');
        // console.log(display);
        return true;
    },

    createMultipleImages(req, res) {
        module.exports.create(req, 0, module.exports.create);
    }

};