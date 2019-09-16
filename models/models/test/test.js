var request = require('request-promise');

var db_url = 'http://couchdb:5984';
var test_url = db_url + '/test';

module.exports = {

  sanity: function(req, res){

    console.log('sanity test');

    request({
      url: db_url,
      method: 'GET',
      simple: true,
    }).then(function() {
      console.log('success');
      res.status(200).end();
    }).catch(function() {
      console.log('error');
      res.status(400).end();
    });
    
  }

}
