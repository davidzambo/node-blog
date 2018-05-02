const Helpers = require('../helpers');
const path = require('path');

module.exports = {
    optimalize(req, res, next){
        if (req.files || req.files.length > 0) {
            for (let file of req.files) {
                Helpers.imageResizer(path.resolve(__dirname, '../', file.path), 250, 'thumbnail');
                Helpers.imageResizer(path.resolve(__dirname, '../', file.path), 850, 'display');
            }
        }
        return next();
    },
};