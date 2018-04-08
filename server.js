const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = process.env.PORT;

const PostController = require('./controllers/PostController');
const CategoryController = require('./controllers/CategoryController');
const UsersController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');
const StatisticsController = require('./controllers/StatisticsController');
const AuthMiddleware = require('./middlewares/Auth');

// Middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(cookieParser());
app.use('/public', express.static('public'));

// Routes
app.get('/api/posts/', PostController.index);
app.get('/api/posts/:slug', PostController.show);
app.post('/api/posts', AuthMiddleware.isAuthenticated, PostController.create);
app.put('/api/posts/', AuthMiddleware.isAuthenticated, PostController.update);
app.delete('/api/posts/', AuthMiddleware.isAuthenticated, PostController.destroy);

app.get('/api/matches', MatchController.index);
app.get('/api/matches/:id', MatchController.show);
app.post('/api/matches', AuthMiddleware.isAuthenticated, MatchController.create);
app.put('/api/matches', AuthMiddleware.isAuthenticated, MatchController.update);
app.delete('/api/matches', AuthMiddleware.isAuthenticated, MatchController.destroy);

app.get('/api/statistics', StatisticsController.index);
app.get('/api/statistics/:id', StatisticsController.show);
app.post('/api/statistics', AuthMiddleware.isAuthenticated, StatisticsController.create);
app.put('/api/statistics', AuthMiddleware.isAuthenticated, StatisticsController.update);
app.delete('/api/statistics', AuthMiddleware.isAuthenticated, StatisticsController.destroy);

app.get('/api/category/:category', CategoryController.index);


app.post('/api/login', UsersController.checkUser);
app.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`Listening on port ${port}`);
});