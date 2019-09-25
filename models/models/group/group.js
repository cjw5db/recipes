var request = require('request-promise');

const db_url = 'http://couchdb:5984/';
const group_url = db_url + 'groups/';
const all_views_url = group_url + '_design/all/_view/';
const user_url = db_url + '_users/org.couchdb.user:'

function create(req, res, next){

  if(!(req.body.name && req.body.owner_id)){
    return next('missing required data');
  }

  const name = req.body.name;
  const owner_id = req.body.owner_id;

  request({
    url: user_url + owner_id,
    method: 'HEAD',
    simple: true,
  }).then(function() {
    return request({
      url: db_url + '_uuids/',
      method: 'GET',
      simple: true,
      json: true,
    })
  }).then(function(body){
    return request({
      url: group_url + body['uuids'][0],
      method: 'PUT',
      body: {
        "name": name,
        "owner": owner_id,
        "users": [],
      },
      simple: true,
      json: true,
    })
  }).then(function(body){
    res.send(body);
  }).catch(function(err){
    return next(err);
  });
};

//check if owner of group
//check if new user is valid
//add user to group
function add_user(req, res, next){

  if(!(req.body.group_id && req.body.user_id && req.body.owner_id)){
    return next('missing required data');
  }

  const group_id = req.body.group_id;
  const user_id = req.body.user_id;
  const owner_id = req.body.owner_id;

  request({
    url: all_views_url + 'user-groups/',
    method: 'GET',
    qs: {
      "key": [
        owner_id, 
        0
      ],
    },
    simple: true,
    json: true,
  }).then(function(body){
    if(body.total_rows == 0){
      return next('user not found');
    }

    var row = body.rows.find(function(dict){
      return (dict.id == group_id);
    });

    if(row == undefined){
      return next('user is not owner of this group');
    }

    return request({
      url: user_url + user_id,
      method: 'HEAD',
      simple: true,
    })
  }).then(function(){
    return request({
      url: group_url + group_id,
      method: 'GET',
      simple: true,
      json: true,
    })
  }).then(function(body){

    if(body.users.includes(user_id)){
      return next('user already in group');
    }

    body.users.push(user_id);
    return request({
      url: group_url + group_id,
      method: 'PUT',
      simple: true,
      json: true,
      body: body,
    })
  }).then(function(body){
    return res.send(body);
  }).catch(function(err){
    return next(err);
  });

};

module.exports = {

  create: create,
  
  add_user: add_user, 

}
