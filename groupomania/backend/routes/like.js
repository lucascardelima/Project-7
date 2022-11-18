const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.post('/getlikes', likeCtrl.getLikes);
router.get('/checkuserlike', likeCtrl.checkUserLike);
router.post('/', likeCtrl.like);
router.delete('/dislike', likeCtrl.dislike);

module.exports = router;