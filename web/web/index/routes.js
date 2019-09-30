var express = require('express');
var router = express.Router();

var index = require('./index');

router.get('/', index.index, function(req, res) {
  
  res.locals.title = 'index';
  console.log(res.locals);
  res.render('index', res.locals);
});

module.exports = router;

