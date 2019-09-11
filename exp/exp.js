
const port = 8000;

var express = require('express');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//var appRouter = require('./exp/routes');
//app.use(appRouter);


var request = require('request-promise');
var url = 'http://models:8000/test';

app.get('/test/', function(req, res){
  console.log('in exp');
  request({
    url: url,
    method: 'GET',
    simple: false,
  }).then(function(body) {
    console.log('SUCCESS: ' + body);
    res.send('exp\n' + body);
  }).catch(function(err) {
    console.log("ERROR: " + err);
  });
});

var server = http.createServer(app);

server.listen(port, () => console.log(`exp listening on port ${port}`));
