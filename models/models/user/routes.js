
var express = require('express');
var router = express.Router();
router.use(express.json());

var user = require('./user');

router.post('/create', user.create);

module.exports = router;
