
var express = require('express');
var router = express.Router();
router.use(express.json());

var user = require('./user');

router.post('/create', user.create);

router.get('/:user/list_groups', user.list_groups);

module.exports = router;
