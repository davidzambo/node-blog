const base64img = require('base64-img');
const lwip = require('lwip');
const path = require('path');
const uuidv4 = require('uuidv4');

module.exports = {

    twoDigitNumber(nmb){
        return (nmb < 10) ? '0' + nmb : nmb;
    },
    
    /**
     * @param {*} body  html string
     * @param {*} destination destination folder
     * Investigate the body, looking for base64 coded images
     * Store them in the given target directory
     * Replace the link in the body
     * Returns the new body
     */
    base64ToFileStorer(body, destination = '/public/images'){
        // get all base64 from the post's body
        // console.log('start base64' + body.length);
        let base64Images = body.match(/data:image[^"]+/g),
            binaryImage;
        // console.log(base64Images.length);
        // store all base64 image and gather the new filenames
        if (base64Images !== null) {
            // console.log('we have base64 images')
            base64Images.map((img) => {
                // console.log('mapping body');
                binaryImage = '/'+base64img.imgSync(img, destination, uuidv4())
                this.imageResizer(__dirname+binaryImage);
                body = body.replace(img, binaryImage);
    
            });
        }
        // console.log('finished body ' + body.length);
        // return the replaced image body
        return body;
    },
    
    /**
     * @param {*} tagString
     * split the fiven string on '+', convert it to lowercase, than
     * examine all tag to be unique.
     * Retruns the unique tag array;
     */
    tagsHandler(tagString){
        return tagString.toLowerCase().split('+').reduce((uniqueTags, tag) => {
            if (uniqueTags.indexOf(tag) === -1)
                uniqueTags.push(tag);
            return uniqueTags;
        }, []);
    },

    imageResizer(img, maxWidth = 1350, suffix = "") {
        try {
            const createdFile = suffix === '' ? img : img.replace('original', suffix);
            lwip.open(img, (err, image) => {
                if (err) console.error(err);
                if (image.width() > maxWidth) {
                    image.resize(maxWidth, (image.height() * (maxWidth / image.width()) ), (err, resized) => {
                            if (err) throw err;
                            resized.writeFile(createdFile, err => {
                                if (err) throw err;
                                return createdFile;
                            });
                        });
                } else {
                    image.writeFile(createdFile, err => {
                        if (err) throw err;
                        return createdFile;
                    })
                }
            });
        } catch (e) {
            console.log(e);
        }
    },

    imageUploadResizer(img, maxWidth = 1350, suffix = '') {
        return new Promise((resolve, reject) => {
            try {
                const imgNameParts = img.split('.');
                imgNameParts[imgNameParts.length-2] += `_${suffix}`;
                const newFileName = imgNameParts.join('.');

                lwip.open(img, (err, image) => {
                    if (err) console.error(err);
                    if (image.width() > maxWidth) {
                        image.resize(maxWidth, (image.height() * (maxWidth / image.width()) ), (err, resized) => {
                            if (err) throw err;
                            resized.writeFile(newFileName, err => {
                                if (err) throw err;
                                resolve(path.basename(newFileName));
                            });
                        });
                    } else {
                        image.writeFile(newFileName, err => {
                            if (err) throw err;
                            resolve(path.basename(newFileName));
                        })
                    }
                });
            } catch (e) {
                console.log(e);
                reject(img);
            }
        });
    }
}