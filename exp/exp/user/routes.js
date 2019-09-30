var express = require('express');
var router = express.Router();

router.use(express.json());

var user = require('./user');

router.post('/signup', user.signup, user.signin);

router.post('/signin', user.signin);

module.exports = router;
