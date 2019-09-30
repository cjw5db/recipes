var express = require('express');
var router = express.Router();

var session = require('./session');

router.post('/start', session.start);

router.get('/get_user', session.get_user);

router.delete('/end', session.end);

module.exports = router;
