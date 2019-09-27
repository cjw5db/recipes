var express = require('express');
var router = express.Router();

var user = require('./user');

router.use(express.json());

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup_form', function(req, res, next) {
  res.render('user/signup_form');
});

router.post('/signup', user.signup, function(req, res, next) {
  res.redirect('/');
});

router.post('/signin', user.signin, function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
