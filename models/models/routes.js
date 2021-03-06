
var express = require('express');
var router = express.Router();

var userRouter = require('./user/routes');
router.use('/user', userRouter);

var sessionRouter = require('./session/routes');
router.use('/session', sessionRouter);

var groupRouter = require('./group/routes');
router.use('/group', groupRouter);

var testRouter = require('./test/routes');
router.use('/test', testRouter);

module.exports = router;
