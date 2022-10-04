const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');

router.post('/createcomment', commentsCtrl.createComment);
router.post('/updatecomment', commentsCtrl.updateComment);
router.post('/deletecomment', commentsCtrl.deleteComment);





module.exports = router;