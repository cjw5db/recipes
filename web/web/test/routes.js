var express = require('express');
var router = express.Router();

var test = require('./test');

router.get('/sanity', test.sanity);

module.exports = router;
