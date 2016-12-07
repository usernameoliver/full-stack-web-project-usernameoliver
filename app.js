var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, './src/main/resources/public')));
require('./routes/routes.js')(app);


const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
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