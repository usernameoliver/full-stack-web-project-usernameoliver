var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
module.exports = function (app) {

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


        //@OliverHaoprint the content of the file
       /* var testFolder = '/uploads/';
        fs.readdir(testFolder, function(err, items) {

            console.log(items);

        });*/

        dir.readFiles(path.join(__dirname, '/uploads/'),
            function(err, content, next) {
                if (err) throw err;
                console.log('content:', content);
                next();
            },
            function(err, files){
                if (err) throw err;
                console.log('finished reading files:', files);
            });

        /* print the content of file data.txt
        var filePath = path.join(__dirname, 'uploads/data.txt');
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err){
            console.log('received data: ' + data);
            }else{
                console.log(err);
            }

        });


        end print
        */

    });

};