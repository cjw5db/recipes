
var request = require('request-promise');

var db_url = 'http://couchdb:5984';

var user_url = db_url + '/_users/org.couchdb.user:';
var session_url = db_url + '/_session';

function create(req, res, next){

  if (!(req.body.name && req.body.password)){
    return next('missing required fields');
  }
  
  const name = req.body.name;
  const password = req.body.password;

  request({
    method: 'PUT',
    url: user_url + name,
    body: {
      "name": name, 
      "password": password, 
      "type": "user",
      "roles": [],
    },
    json: true,
    simple: true,
  }).then(function(body){
    res.status(200).send(body); 
  }).catch(function(err){
    return next(err);
  });
}


function authenticate(req, res, next){
  
  if (!(req.body.name && req.body.password)){
    return next('missing required fields');
  }
  
  const name = req.body.name;
  const password = req.body.password;


  request({
    method: 'POST',
    url: session_url,
    form: {
      "name": name,
      "password": password,
    },
    simple: true,
    json: true,
    resolveWithFullResponse: true,
  }).then(function(response){
    res.status(200).json({'cookie': response.headers['set-cookie'][0]});
  }).catch(function(err){
    return next(err);
  });
}


module.exports = {

  create: create, 

  authenticate: authenticate,

}


