var request = require('request-promise');

var db_url = 'http://couchdb:5984';

var session_url = db_url + '/_session';

function start(req, res, next){
  if (!(req.body.name && req.body.password)){
    return next('missing required fields');
  }
  
  const name = req.body.name;
  const password = req.body.password;

  request({
    method: 'POST',
    url: session_url,
    body: {
      "name": name,
      "password": password,
    },
    simple: true,
    json: true,
    resolveWithFullResponse: true,
  }).then(function(response){
    res.status(200).json({'cookie': response.headers['set-cookie']});
  }).catch(function(err){
    return next(err);
  });

}

function get_user(req, res, next){

  if(!(req.query.AuthSession)){
    return next('missing auth');
  }

  const auth = req.query.AuthSession;

  request({
    method: 'GET',
    url: session_url,
    headers:{
      "Cookie": "AuthSession=" + auth,
    },
    simple: true,
    json: true,
  }).then(function(body){
    console.log(body);
    res.status(200).send(body.userCtx);
  }).catch(function(err){
    return next(err);
  });


}

function end(req, res, next){
  if(!(req.query.AuthSession)){
    return next('missing auth');
  }

  const auth = req.query.AuthSession;

  request({
    method: 'DELETE',
    url: session_url,
    headers:{
      "Cookie": "AuthSession=" + auth,
    },
    simple: true,
  }).then(function(){
    res.status(200).end();
  }).catch(function(err){
    return next(err);
  })

}

module.exports = {

  start: start,

  get_user: get_user,

  end: end,

}
