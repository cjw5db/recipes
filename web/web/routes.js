var express = require('express');
var router = express.Router();

var indexRouter = require('./index/routes');
//var userRouter = require('./user/routes');
//var recipeRouter = require('./recipe/routes');

router.use('/', indexRouter);
//router.use('/user', userRouter);
//router.use('/recipe', recipeRouter);

module.exports = router;
