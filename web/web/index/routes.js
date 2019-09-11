var express = require('express');
var router = express.Router();

//var middleware = require('./route_middleware/test_middleware');

/* GET home page. */
//router.get('/', middleware.test, middleware.sync, function(req, res) {
router.get('/', function(req, res) {
  res.render('index', { title: 'express' });
});


var request = require('request-promise');

var url = 'http://exp:8000/test/';

router.get('/test', function(req, res, next) {
  console.log('in web');
  request({
    url: url,
    method: 'GET',
    simple: false,
  }).then(function(body) {
    console.log('SUCCESS: ' + body);
    data = 'web\n' + body;
    res.render('test', { title: 'test', data: data });
  }).catch(function(err) {
    console.log("ERROR: " + err);
  });
});


module.exports = router;

