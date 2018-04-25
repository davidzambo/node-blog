const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const port = process.env.PORT;


// Middlewares
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));
app.use(cookieParser());
app.use('/public', express.static('public'));

// Routes
const api = require('./routes/api');
app.use('/api', api);


app.listen(port, (err) => {
    if (err) console.error(err);
    console.log(`Listening on port ${port}`);
});