const base64img = require('base64-img');
const lwip = require('lwip');
const path = require('path');
const uuidv4 = require('uuidv4');
const easyimage = require('easyimage');

module.exports = {
    
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

    async imageResizer(img, maxWidth = 1350, suffix = "") {

        const createdFile = suffix === '' ? img : img.replace('original', suffix);
        try {
            const info = await easyimage.info(img);
            const thumbnail = await easyimage.thumbnail({
                src: img,
                width: maxWidth,
                height: (info.height * (maxWidth / info.width)),
                dst: createdFile,
            });
            console.log(thumbnail.path);
        } catch (e) {
            console.log('Error: ' +e);
        }
    },
}