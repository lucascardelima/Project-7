const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');

router.get('/getposts', postsCtrl.getPosts);
router.post('/createpost', postsCtrl.createPost);
router.post('/deletepost', postsCtrl.deletePost);
router.post('/updatepost', postsCtrl.updatePost);

module.exports = router;