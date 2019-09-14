var express = require('express');
var router = express.Router();

//var middleware = require('./route_middleware/test_middleware');

/* GET home page. */
//router.get('/', middleware.test, middleware.sync, function(req, res) {
router.get('/', function(req, res) {
  res.render('index', { title: 'express' });
});

module.exports = router;

