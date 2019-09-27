
var express = require('express');
var router = express.Router();
router.use(express.json());

var user = require('./user');

router.post('/create', user.create);

router.post('/authenticate', user.authenticate);

module.exports = router;
