const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');

router.get('/getlikes', likeCtrl.getLikes);
router.get('/checkuserlike', likeCtrl.checkUserLike);
router.post('/', likeCtrl.like);
router.post('/dislike', likeCtrl.dislike);