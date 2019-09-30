
var request = require('request-promise');

var models_url = 'http://models:8000';

var session_url = models_url + '/session';

function index(req, res, next){

  if(!(req.query.AuthSession)){
    return next('missing required fields');
  }

  const auth = req.query.AuthSession;

  request({
    method: 'GET',
    url: session_url + '/get_user',
    qs: {
      "AuthSession": auth,
    },
    simple: true,
    json: true,
  }).then(function(body){

    console.log(body);


    res.status(200).send(body);
  }).catch(function(err){
    return next(err);
  });
}

module.exports = {
  
  index: index,

}
