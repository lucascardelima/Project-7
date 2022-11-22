const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');

router.post('/createcomment', commentsCtrl.createComment);
router.put('/updatecomment', commentsCtrl.updateComment);
router.delete('/deletecomment', commentsCtrl.deleteComment);
router.post('/getcomments', commentsCtrl.getComments);

module.exports = router;