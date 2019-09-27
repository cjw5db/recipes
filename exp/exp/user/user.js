var request = require('request-promise');

const models_url = 'http://models:8000';

const user_url = models_url + '/user';

function signup(req, res, next){
  request({
    method: 'POST',
    url: user_url + '/create', 
    simple: true,
    json: true,
    body: req.body,
  }).then(function(body){
    res.status(200).send('SUCCESS: ' + body);
  }).catch(function(err){
    return next(err);
  });
}

function signin(req, res, next){

  request({
    method: 'POST',
    url: user_url + '/authenticate',
    body: req.body,
    simple: true,
    json: true,
  }).then(function(body){
    res.set('set-cookie', body.cookie);
    res.status(200).end();
  }).catch(function(err){
    return next(err);
  });


}

module.exports = {

  signup: signup, 
  
  signin: signin,

}
