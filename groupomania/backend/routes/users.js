const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

router.get('/getusers', usersCtrl.getUsers);
router.get('/getuser', usersCtrl.getUser);
router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);

module.exports = router;