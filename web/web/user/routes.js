var express = require('express');
var router = express.Router();

var mw = require('./user');

router.use(express.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('user/signup');
});

router.post('/create', mw.create, function(req, res, next) {
  res.redirect('/');
});


module.exports = router;
