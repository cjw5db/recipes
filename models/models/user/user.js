
var request = require('request-promise');

var db_url = 'http://couchdb:5984/';

const user_url = db_url + '_users/org.couchdb.user:';
const group_url = db_url + 'groups/';
const group_views_url = group_url + '_design/all/_view/';

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

function list_groups(req, res, next){
  
  console.log(req.params);

  if(!(req.params.user)){
    return next('missing required data');
  }

  const name = req.params.user;

  const view_start_key = JSON.stringify([name, 0]);
  const view_end_key = JSON.stringify([name, 1]);

  request({
    method: 'GET',
    url: group_views_url + 'user-groups/',
    qs: {
      "startkey": view_start_key,
      "endkey": view_end_key,
      "include_docs": true,
    },
    simple: true,
    json: true,
  }).then(function(body){
    console.log(body);

    var data = []

    for(let row of body.rows){
      data.push(row.doc);
    }

    res.status(200).send(data);
  }).catch(function(err){
    return next(err);
  })
}

module.exports = {

  create: create, 

  list_groups: list_groups,

}


