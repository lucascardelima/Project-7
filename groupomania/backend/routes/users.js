const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

router.get('/users', usersCtrl.getUsers);
router.post('/users/login', usersCtrl.login);
router.post('/users', usersCtrl.insertUsers);

module.exports = router;