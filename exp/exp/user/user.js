var request = require('request-promise');

const models_url = 'http://models:8000';

const user_url = models_url + '/user';
const group_url = models_url + '/group';
const session_url = models_url + '/session';

/*
create user,
then create default group with user as owner
*/

function signup(req, res, next){

  if (!(req.body.name && req.body.password)){
    return next('missing required fields');
  }

  const name = req.body.name;
  const password = req.body.password;

  request({
    method: 'POST',
    url: user_url + '/create', 
    simple: true,
    json: true,
    body: {
      "name": name,
      "password": password,
    },
  }).then(function(body){
    return request({
      method: 'POST',
      url: group_url + '/create',
      simple: true,
      json: true,
      body: {
        "name": "First Group",
        "owner_id": name,
      }
    });
  }).then(function(body){
    res.status(200).end();
  }).catch(function(err){
    return next(err);
  });
}

function signin(req, res, next){

  if (!(req.body.name && req.body.password)){
    return next('missing required fields');
  }

  const name = req.body.name;
  const password = req.body.password;

  request({
    method: 'POST',
    url: session_url + '/start',
    body: {
      "name": name,
      "password": password,
    },
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
