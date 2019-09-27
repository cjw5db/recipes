var express = require('express');
var router = express.Router();

var all = require('./all');
router.all('*', all.authenticated);

var indexRouter = require('./index/routes');
router.use('/', indexRouter);

var userRouter = require('./user/routes');
router.use('/user', userRouter);

var testRouter = require('./test/routes');
router.use('/test', testRouter);

module.exports = router;
