var request = require('request-promise');

var exp_url = 'http://exp:8000';

module.exports = {
  
  create: function (req, res, next) {
    var options = {
      method: 'POST',
      url: exp_url.concat('/user/create'),
      simple: true,
      json: true,
      body: req.body
    }

    request(
      options
    ).then(function (body) {
      console.log("SUCCESS: " + body);
      next();
    }).catch(function (err) {
      console.log("ERROR: " + err);
      res.redirect('/'); 
    });
  },
};
