const express = require('express');
const router = express.Router();

const photosCtrl = require('../controllers/photos');
const multer = require('../middleware/multer-config')

router.post('/userphoto', multer, photosCtrl.userPhoto);
router.post('/postphoto', multer, photosCtrl.postPhoto);

module.exports = router;