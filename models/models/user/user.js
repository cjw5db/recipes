
var request = require('request-promise');

var db_url = 'http://couchdb:5984';

var user_url = db_url + '/_users/org.couchdb.user:';

function create(req, res, next){
  request({
    method: 'PUT',
    url: user_url + req.body.name,
    body: {
      "name": req.body.name, 
      "password": req.body.password, 
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


module.exports = {

  create: create, 

}


