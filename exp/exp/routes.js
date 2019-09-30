var express = require('express');
var router = express.Router();

var userRouter = require('./user/routes');
router.use('/user', userRouter);

var testRouter = require('./test/routes');
router.use('/test', testRouter);

var indexRouter = require('./index/routes');
router.use('/index', indexRouter);

module.exports = router;
