
const port = 8000;

var express = require('express');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//var appRouter = require('./models/routes');
//app.use(appRouter);

var request = require('request-promise');
var url = 'http://db:5984/';

app.get('/test/', function(req, res){
  console.log('in models');
  request({
    url: url,
    method: 'GET',
    simple: false,
  }).then(function(body) {
    console.log('SUCCESS: ' + body);
    res.send('models\n' + body);
  }).catch(function(err) {
    console.log("ERROR: " + err);
  });
});

var server = http.createServer(app);

server.listen(port, () => console.log(`models listening on port ${port}`));
