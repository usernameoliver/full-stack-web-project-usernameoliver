var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var USERS_COLLECTION = "users";
var mongodb = require("mongodb");
var async = require('async');
var ObjectID = mongodb.ObjectID;
console.log('assign text to undefined');
var text = undefined;


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
                    var r = {
                                status  : 200,
                                success : 'login Successfully'
                            }
                    res.end(JSON.stringify(r));
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
          handleError(res, err.message, "Failed to create new user.");
        } else {
          var r = {
            status  : 201,
            success : 'sign up Successfully'
                                      }
          res.end(JSON.stringify(r));
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

        function getText(callback) {
            form.on('file', function(field, file) {
                fs.rename(file.path, path.join(form.uploadDir, file.name));
                fs.readFile(path.join(form.uploadDir, file.name), 'utf8', function(err, data) {
                  if (err) throw err;

                  text = data;
                  console.log('in getText(), assign text to ' + text);
                  callback();
                });
            });
        }
        function sendResponse() {
            console.log('in sendResponse(), text is ' + text);
                var r2 = {
                      status  : 201,
                      data    : text,
                      success : 'Upload Successfully'
                }
                console.log("I am sending this back: " + JSON.stringify(r2));
                res.end(JSON.stringify(r2));
        }
        getText(sendResponse);








      // log any errors that occur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });

      // once all the files have been uploaded, send a response to the client


      // parse the incoming request containing the form data
      form.parse(req);

/*
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
*/


    });

};