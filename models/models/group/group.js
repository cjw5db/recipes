var request = require('request-promise');

var db_url = 'http://couchdb:5984/';

var group_url = db_url + 'groups/';

var user_url = db_url + '_users/org.couchdb.user:'

module.exports = {

  create: function(req, res, next){

    if(!req.body.name){
      return next('missing required data');
    }

    request({
      url: group_url,
      method: 'HEAD',
      simple: true,
    }).then(function() {
      console.log('1');
      return request({
        url: db_url + '_uuids/',
        method: 'GET',
        simple: true,
        json: true,
      })
    }).then(function(body){
      console.log('2');
      return request({
        url: group_url + body['uuids'][0],
        method: 'PUT',
        body: {
          "name": req.body.name,
          "users": [],
        },
        simple: true,
        json: true,
      })
    }).then(function(body){
      console.log(2);
      res.send(body);
    }).catch(function(err){
      return next(err);
    });

  },

  add_user: function(req, res, next){

    if(!(req.body.group_id && req.body.user_id)){
      return next('missing required data');
    }

    var user, group;

    request({
      url: group_url,
      method: 'HEAD',
      simple: true,
    }).then(function() {
      return request({
        url: user_url + req.body.user_id,
        method: 'GET', 
        simple: true,
        json: true,
      })
    }).then(function(body) {
      user = body;
      return request({
        url: group_url + req.body.group_id,
        method: 'GET',
        simple: true,
        json: true,
      })
    }).then(function(body) {
      group = body;
      group.users.push(req.body.user_id);

      return request({
        url: group_url + req.body.group_id,
        method: 'PUT',
        simple: true,
        json: true,
        body: group,
      })

    }).then(function() {

      user.groups.push(req.body.group_id);

      return request({
        url: user_url + req.body.user_id,
        method: 'PUT',
        simple: true,
        json: true,
        body: user,
      })
    }).then(function() {
      res.status(200).end();
    }).catch(function(err) {
      return next(err);
    });
    
  },
}
