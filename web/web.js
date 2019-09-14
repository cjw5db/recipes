
const port = 8000;

var express = require('express');
var path = require('path');
var http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

var appRouter = require('./web/routes');
app.use(appRouter);

var server = http.createServer(app);

server.listen(port, () => console.log(`web listening on port ${port}`));



