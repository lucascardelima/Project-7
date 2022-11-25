const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth')

router.post('/createcomment', auth, commentsCtrl.createComment);
router.post('/deletecomment', auth, commentsCtrl.deleteComment);
router.post('/getcomments', auth, commentsCtrl.getComments);

module.exports = router;