var express = require('express');
var router = express.Router();

router.use(express.json());

var group = require('./group');

router.post('/create', group.create);

router.post('/add_user', group.add_user);

module.exports = router;


