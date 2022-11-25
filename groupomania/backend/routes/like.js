const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth')

router.post('/getlikes', auth, likeCtrl.getLikes);
router.get('/checkuserlike', auth, likeCtrl.checkUserLike);
router.post('/', auth, likeCtrl.like);
router.post('/dislike', auth, likeCtrl.dislike);

module.exports = router;