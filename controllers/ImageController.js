const mongoose = require('mongoose');
const imageSchema = require('../models/ImageModel');
const Image = mongoose.model('Image', imageSchema);
const Helper = require('../helpers');
const path = require('path');
const fs = require('fs');

module.exports = {
     async create(req, index = 0, stored = [], next = module.exports.create) {
        return new Promise(async (resolve, reject) => {
            try{

                const baseFile = path.resolve(__dirname, '../', req.files[index].path);
                const [thumbnail, display] = await Promise.all([
                    Helper.imageUploadResizer(baseFile, 200, 'thumbnail'),
                    Helper.imageUploadResizer(baseFile, 1350, 'display')
                ]);

                const image = new Image({
                    thumbnail: './public/images/'+thumbnail,
                    display: './public/images/'+display
                });

                image.save((err, img) => {
                    if (err) console.error(err);
                    stored.push(img);
                    console.log('image saved');
                    fs.unlink(baseFile, err => {
                        if (err) console.error(err);
                    });

                    resolve(stored);
                    // if (index < req.files.length - 1) {
                    //     console.log(stored.length);
                    //     resolve(next(req, ++index, stored, next));
                    // } else {
                    //     console.log('iteration is ready');
                    //     console.log(stored.length);
                    //     console.log(stored);
                    //     resolve(stored);
                    //     reject(console.log('para'));
                    // }
                })
            } catch (e){
                console.log(e);
                reject(e);
            }

        });
    },

    async createMultipleImages(req, res) {
        return new Promise(async (resolve, reject) => {
            console.log('IMAGE FACTORY START');
            const images = await module.exports.create(req, 0, [], module.exports.create);
            console.log('IMAGE FACTORY STOP');
            console.log(images);
            resolve(images);
            reject(console.log('create para'));
            });
        ;
    },

};