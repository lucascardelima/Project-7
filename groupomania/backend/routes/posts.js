const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth')

router.post('/getposts', auth, postsCtrl.getPosts);
router.post('/createpost', auth, postsCtrl.createPost);
router.delete('/deletepost', auth, postsCtrl.deletePost);
router.put('/updatepost', auth, postsCtrl.updatePost);
router.post('/getpost', auth, postsCtrl.getPost);

module.exports = router;