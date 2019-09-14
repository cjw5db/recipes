var request = require('request-promise');

var db_url = 'http://models:8000';
var test_url = db_url + '/test';

module.exports = {

  sanity: function(req, res){

    console.log('sanity test');

    var options = {
      url: test_url + '/sanity',
      method: 'GET',
      simple: true,
    }
    
    request(
      options
    ).then(function() {
      console.log('success');
      res.status(200).end();
    }).catch(function() {
      console.log('error');
      res.status(400).end();
    });
  },
}
