var request = require('request-promise');

var exp_url = 'http://exp:8000';

var user_url = exp_url + '/user';

function signup(req, res, next){
  request({
    method: 'POST',
    url: user_url + '/signup',
    simple: true,
    json: true,
    body: req.body
  }).then(function (body) {
    return next();
  }).catch(function (err) {
    return next(err);
  });

}

function signin(req, res, next){
  request({
    method: 'POST',
    url: user_url + '/signin',
    simple: true,
    json: true,
    body: req.body,
    resolveWithFullResponse: true,
  }).then(function(response){
    res.set('set-cookie', response.headers['set-cookie']);
    return next();
  }).catch(function(err){
    return next(err);
  })
}


module.exports = {
  
  signup: signup,

  signin: signin,

};
