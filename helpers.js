const base64img = require('base64-img');


module.exports = {

    twoDigitNumber(nmb){
        return (nmb < 10) ? '0' + nmb : nmb;
    },
    
    /**
     * Generates a random filename
     */
    randomFilename(len = 8){
        let filename = new Date().getFullYear().toString().substr(-2) + nice(new Date().getMonth() + 1) + nice(new Date().getDate());
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
        let base64Images = body.match(/data:image[^"]+/g);
        // console.log(base64Images.length);
        // store all base64 image and gather the new filenames
        if (base64Images !== null) {
            // console.log('we have base64 images')
            base64Images.map((img) => {
                // console.log('mapping body');
                body = body.replace(img, base64img.imgSync(img, destination, randomFilename()));
    
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
}