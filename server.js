const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const PostController = require('./controllers/PostController');
const PostModel = require('./models/PostModel');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use('/public', express.static('public'));

// Routes
app.get('/api/posts', PostController.index);
app.post('/api/posts', PostController.create);
app.put('/api/posts/:id', PostController.update);

app.listen(port, () => console.log(`Listening on port ${port}`));
