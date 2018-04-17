const base64img = require('base64-img');
const lwip = require('lwip');

module.exports = {

    twoDigitNumber(nmb){
        return (nmb < 10) ? '0' + nmb : nmb;
    },
    
    /**
     * Generates a random filename
     */
    randomFilename(len = 8){
        let filename = new Date().getFullYear().toString().substr(-2)
                    + this.twoDigitNumber(new Date().getMonth() + 1)
                    + this.twoDigitNumber(new Date().getDate());
        for (let i = 0; i < len; i++)
            filename += String.fromCharCode(Math.ceil(Math.random() * 24) + 97);
        return filename;
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
                binaryImage = '/'+base64img.imgSync(img, destination, this.randomFilename())
                this.imgResizer(__dirname+binaryImage);
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

    imgResizer(img, maxWidth = 1350, suffix = '') {
        try {
            const imgNameParts = img.split('.');
            imgNameParts[imgNameParts-2] += `_${suffix}`;
            const newFileName = imgNameParts.join('.');

                lwip.open(img, (err, image) => {
                if (err) throw err;
                if (image.width() > maxWidth) {
                    image.resize(maxWidth, (image.height() * (maxWidth / image.width()) ), (err, resized) => {
                            if (err) throw err;
                            resized.writeFile(newFileName, err => {
                                if (err) throw err;
                                return newFileName;
                            });
                        });
                } else {
                    img.writeFile(newFileName, err => {
                        if (err) throw err;
                        return newFileName;
                    })
                }
            });
        } catch (e){
            console.log(e);
            return img;
        }
    },
}