
var request = require('request-promise');

var exp_url = 'http://exp:8000';
var test_url = exp_url + '/test';

module.exports = {
  sanity: function(req, res, next) {

    console.log('sanity test');

    var options = {
      url: test_url + '/sanity',
      method: 'GET',
      simple: true,
    }

    request(
      options
    ).then(function(body) {
      console.log('success');
      res.render('test', { name: 'sanity', result: 'success' });
    }).catch(function(err) {
      console.log('failure');
      res.render('test', { name: 'sanity', result: 'failure' });
    });
  },
}

