const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const auth = require('../middleware/auth');

router.get('/getuser', usersCtrl.getUser);
router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);
router.post('/updateuser', usersCtrl.updateUser);
router.post('/deleteuser', auth, usersCtrl.deleteUser);

module.exports = router;