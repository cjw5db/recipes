
const port = 8000;

var express = require('express');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var modelsRouter = require('./models/routes');
app.use(modelsRouter);

app.use(function(err, req, res, next){
  console.log(err);

  res.status(500).send(err).end();
});

var server = http.createServer(app);

server.listen(port, () => console.log(`models listening on port ${port}`));
