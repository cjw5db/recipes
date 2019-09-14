
const port = 8000;

var express = require('express');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var expRouter = require('./exp/routes');
app.use(expRouter);

var server = http.createServer(app);

server.listen(port, () => console.log(`exp listening on port ${port}`));
