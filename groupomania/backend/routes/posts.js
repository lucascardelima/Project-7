const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const commentsCtrl = require('../controllers/comments');

router.post('/posts/createpost', postsCtrl.createPost);
router.post('/posts/deletepost', postsCtrl.deletePost);
router.post('/posts/updatepost', postsCtrl.updatePost);
router.post('/posts/createcomment', commentsCtrl.createComment);
router.post('/posts/updatecomment', commentsCtrl.updateComment);
router.post('/posts/deletecomment', commentsCtrl.deleteComment);





module.exports = router;