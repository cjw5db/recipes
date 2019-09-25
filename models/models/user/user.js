
var request = require('request-promise');

var db_url = 'http://couchdb:5984';

var user_url = db_url + '/_users/org.couchdb.user:';

module.exports = {

  create: function(req, res){

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
      console.log("SUCCESS:");
      console.log(body);
      res.status(200).send(body); 
    }).catch(function(err){
      console.log("ERROR:");
      console.log(err);
      res.status(400).send(err);
    });

  },
}


