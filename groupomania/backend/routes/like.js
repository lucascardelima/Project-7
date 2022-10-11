const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.get('/like/getlikes', likeCtrl.getLikes);
router.get('/like/checkuserlike', likeCtrl.checkUserLike);
router.post('/like', likeCtrl.like);
router.post('/like/dislike', likeCtrl.dislike);