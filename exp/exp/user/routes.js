var express = require('express');
var router = express.Router();

router.use(express.json());

var mw = require('./user');

router.post('/create', mw.create);

module.exports = router;
