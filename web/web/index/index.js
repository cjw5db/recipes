var request = require('request-promise');

var exp_url = 'http://exp:8000';

var index_url = exp_url + '/index';

function index(req, res, next){
  
  var auth = req.cookies.AuthSession;

  if(!auth){
    console.log('no auth');
    return next();
  }
  else{
    console.log('yes auth');
    request({
      method: 'GET',
      url: index_url,
      qs: {
        "AuthSession": auth,
      },
      simple: true,
      json: true,
    }).then(function(body){
      res.locals.name = body.name;
      return next();
    }).catch(function(err){
      return next(err);
    })
  }
}

module.exports = {

  index: index,

}
