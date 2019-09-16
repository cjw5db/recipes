var request = require('request-promise');

var exp_url = 'http://exp:8000';

module.exports = {
  
  create: function (req, res, next) {

    request({
      method: 'POST',
      url: exp_url.concat('/user/create'),
      simple: true,
      json: true,
      body: req.body
    }).then(function (body) {
      console.log("SUCCESS: " + body);
      next();
    }).catch(function (err) {
      console.log("ERROR: " + err);
      res.redirect('/'); 
    });
  },
};
