const express = require('express');
const router = express.Router();

const viewsCtrl = require('../controllers/views');
const auth = require('../middleware/auth')

router.post('/', auth, viewsCtrl.viewPost);
router.post('/getviews', auth, viewsCtrl.getViews);


module.exports = router;