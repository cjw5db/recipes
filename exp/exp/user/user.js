var request = require('request-promise');

var models_url = 'http://models:8000';

module.exports = {

  create: function(req, res, next) {

    request({
      method: 'POST',
      url: models_url.concat('/user/create'),
      simple: true,
      json: true,
      body: req.body,
    }).then(function(body){
      console.log('SUCCESS: ' + body);
      res.status(200).send('SUCCESS: ' + body);
    }).catch(function(err){
      console.log('ERROR: ' + err);
      res.status(400).send('ERROR: ' + err);
    });

  },

}
