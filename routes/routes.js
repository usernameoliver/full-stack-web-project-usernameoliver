var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var USERS_COLLECTION = "users";
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;


module.exports = function (app, db) {

    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname, 'index.html'));
    });
    app.get('/try', function(req, res){
          res.sendFile(path.join(__dirname, '/../src/main/resources/public/', 'core.html'));
    });
    app.post("/signin", function(req, res) {
        var userEmail = req.body.email;
        var userPassword = req.body.password;
        console.log(userEmail);
        db.collection(USERS_COLLECTION).findOne({ email: userEmail }, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to get contact");
            } else {
                if (userPassword.toString() === doc.password) {
                    console.log('verified, should redirect to core.html');
                    //res.render('/try');
                    res.sendFile(path.join(__dirname, '/../src/main/resources/public/', 'core.html'));
                }

                else {
                    res.send('user not found');
                }
            }
          });
    });

    app.post("/new", function(req, res) {
      var newContact = req.body;
      console.log("this is newContact.email---------------------------------------->" + newContact.email);
      newContact.createDate = new Date();
/*
      if (!(req.body.email || req.body.password)) {
        handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
      }
*/
      db.collection(USERS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new contact.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    });


    app.post('/upload', function(req, res){

      // create an incoming form object
      var form = new formidable.IncomingForm();
      console.log("the req is " + req);
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


    });

};