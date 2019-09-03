var express = require('express');
var http = require('http');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//var appRouter = require('./exp/routes');
//app.use(appRouter);

const port = 3001;

var server = http.createServer(app);

server.listen(port, () => console.log(`web listening on port ${port}`));
