const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const PostController = require('./controllers/PostController');
const CategoryController = require('./controllers/CategoryController');
const UsersController = require('./controllers/UserController');
const MatchController = require('./controllers/MatchController');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use('/public', express.static('public'));

// Routes
app.get('/api/posts/', PostController.index);
app.get('/api/posts/:slug', PostController.show);
app.post('/api/posts', PostController.create);
app.put('/api/posts/:id', PostController.update);
app.delete('/api/posts/:id', PostController.destroy);

app.get('/api/matches', MatchController.index);
app.post('/api/matches', MatchController.create);
app.get('/api/matches/:id', MatchController.show);
app.put('/api/matches', MatchController.update);
app.delete('/api/matches', MatchController.destroy);

app.get('/api/category/:category', CategoryController.index);

app.post('/api/login', UsersController.checkUser);
app.listen(port, () => console.log(`Listening on port ${port}`));