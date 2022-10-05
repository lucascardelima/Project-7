const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

router.get('/users/getusers', usersCtrl.getUsers);
router.get('/users/getuser', usersCtrl.getUser);
router.post('/users/login', usersCtrl.login);
router.post('/users/insertuser', usersCtrl.insertUser);

module.exports = router;