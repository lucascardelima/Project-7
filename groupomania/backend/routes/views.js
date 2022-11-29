const express = require('express');
const router = express.Router();

const viewsCtrl = require('../controllers/views');
// const auth = require('../middleware/auth')

router.post('/', viewsCtrl.viewPost);
router.post('/getviews', viewsCtrl.getViews);


module.exports = router;