var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;


var app = express();
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

app.use(express.static(path.join(__dirname, './src/main/resources/public')));


var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'html');


var uri = 'mongodb://heroku_9rkf070x:gg2l5l1docoqrq2ieq1ot1oqer@ds129028.mlab.com:29028/heroku_9rkf070x';
mongodb.MongoClient.connect(uri, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  require('./routes/routes.js')(app, db);


  const socketIO = require('socket.io');
  const PORT = process.env.PORT || 5000;
  const INDEX = path.join(__dirname, 'index.html');

  var server = app.listen(PORT, function(){
    console.log('Server listening on ' + PORT);
  });

  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
});
