const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');

router.post('/getposts', postsCtrl.getPosts);
router.post('/createpost', postsCtrl.createPost);
router.delete('/deletepost', postsCtrl.deletePost);
router.put('/updatepost', postsCtrl.updatePost);
router.post('/getpost', postsCtrl.getPost);

module.exports = router;