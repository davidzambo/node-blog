const api = require('express').Router();
const PostController = require('../controllers/PostController');
const CategoryController = require('../controllers/CategoryController');
const UsersController = require('../controllers/UserController');
const MatchController = require('../controllers/MatchController');
const StatisticsController = require('../controllers/StatisticsController');
const NewsletterController = require('../controllers/NewsletterController');
const GalleryController = require('../controllers/GalleryController');
const AuthMiddleware = require('../middlewares/Auth');
const ImageResizerMiddleware = require('../middlewares/ImageResizer');
const uuidv4 = require('uuidv4');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, path.resolve(__dirname, '../', 'public/images'));
    },
    filename(req, file, callback){
        callback(null, uuidv4()+'_original.'+file.mimetype.split('/')[1]);
    }
});

const upload = multer({storage:storage});


module.exports = (function(){
    api.get('/posts/', PostController.index);
    api.get('/posts/:slug', PostController.show);
    api.post('/posts', AuthMiddleware.isAuthenticated, PostController.create);
    api.put('/posts/', AuthMiddleware.isAuthenticated, PostController.update);
    api.delete('/posts/', AuthMiddleware.isAuthenticated, PostController.destroy);

    api.get('/matches', MatchController.index);
    api.get('/matches/:id', MatchController.show);
    api.post('/matches', AuthMiddleware.isAuthenticated, MatchController.create);
    api.put('/matches', AuthMiddleware.isAuthenticated, MatchController.update);
    api.delete('/matches', AuthMiddleware.isAuthenticated, MatchController.destroy);

    api.get('/statistics', StatisticsController.index);
    api.get('/statistics/:id', StatisticsController.show);
    api.post('/statistics', AuthMiddleware.isAuthenticated, StatisticsController.create);
    api.put('/statistics', AuthMiddleware.isAuthenticated, StatisticsController.update);
    api.delete('/statistics', AuthMiddleware.isAuthenticated, StatisticsController.destroy);

    api.get('/archives', PostController.archives.listMonths);
    api.get('/archives/:year/:month', PostController.archives.show);

    api.post('/newsletter', NewsletterController.subscribe);
    // api.put('/newsletter', NewsletterController.send);
    api.put('/newsletter', NewsletterController.approve);

    api.get('/category/:category', CategoryController.index);

    api.get('/gallery/', GalleryController.show);
    api.post('/gallery/',
        AuthMiddleware.isAuthenticated,
        upload.array('files'),
        ImageResizerMiddleware.optimalize,
        GalleryController.create);
    api.put('/gallery/',
        AuthMiddleware.isAuthenticated,
        upload.array('files'),
        ImageResizerMiddleware.optimalize,
        GalleryController.update);
    api.delete('/gallery/', AuthMiddleware.isAuthenticated, GalleryController.destroy);

    api.post('/login', UsersController.checkUser);

    return api;
})();




