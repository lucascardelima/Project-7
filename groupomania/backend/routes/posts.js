const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');

router.post('/posts/createpost', postsCtrl.createPost);


module.exports = router;