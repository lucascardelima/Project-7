const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');

router.post('/posts/createpost', postsCtrl.createPost);
router.post('/posts/createcomment', commentsCtrl.createComment);


module.exports = router;