const express = require('express');
const path = require('path');

const app = express();

const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const likeRoutes = require('./routes/like');
const photosRoutes = require('./routes/photos');
const viewsRoutes = require('./routes/views');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

let options = {

};

app.use(express.static("images", options));

app.use('/api/auth', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/photos', photosRoutes);
app.use('/api/view', viewsRoutes);


module.exports = app;


