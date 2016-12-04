var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'src/main/resources/public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  console.log("before /uploads");
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });



  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

  //@OliverHaoprint the content of the file
  var filePath = path.join(__dirname, 'uploads/data.txt');

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
      if (!err){
      console.log('received data: ' + data);
      }else{
          console.log(err);
      }

  });


  //end print


const socketIO = require('socket.io');


const PORT = process.env.PORT || 3000;



const INDEX = path.join(__dirname, 'index.html');
/*
const server = express()
  .use(express.static(path.join(__dirname, 'src/main/resources/public')))
  .get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
*/

var server = app.listen(PORT, function(){
  console.log('Server listening on 3000');
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);