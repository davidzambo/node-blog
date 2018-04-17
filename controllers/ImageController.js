const Image = require('../models/ImageModel');
const lwip = require('lwip');
const Helper = require('../helpers');

module.exports = {
    create(req, res){
        req.files.forEach(file => {
            const image = new Image();
            image.album = req.body.album;
            image.thumbnail = Helper.imgResizer(__dirname+file.path, 200, 'thumbnail');
            image.display = Helper.imgResizer(__dirname+file.path, 1350, 'display');
            image.save(err => {
                if (err) console.error(err);
                console.log('saved');
            });
        });
        // console.log(req.files);
        res.status(200)
            .json({message: 'Okay'});
    }
};