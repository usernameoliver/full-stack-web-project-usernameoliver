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
var event = undefined;
var eventSentence = undefined;
var SummaryTool = require('node-summary');
var currentEmail = "";


module.exports = function (app, db) {

    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname, 'index.html'));
    });
    app.get('/try', function(req, res){
          res.sendFile(path.join(__dirname, '/../src/main/resources/public/', 'core.html'));
    });

    app.post("/deleteAccount", function(req, res) {
            var userEmail = req.body.email;

            console.log(userEmail);
            db.collection(USERS_COLLECTION).deleteOne({ email: userEmail }, function(err, doc) {
                        if (err) {
                            handleError(res, err.message, "Failed to get contact");
                        } else {

                            var r = {
                                status  : 200,
                                success : 'Account deleted Successfully'
                            }
                            res.end(JSON.stringify(r));
                        }
            });
    });
    app.post("/changePassword", function(req, res) {
            var userEmail = req.body.email;
            var oldPassword = req.body.currentPassword;
            var newPassword = req.body.futurePassword;
            console.log(userEmail);
            if (userEmail === 'visitor') {
                res.send('visitor cannot change password, please register first');
            } else {
                db.collection(USERS_COLLECTION).findOne({ email: userEmail }, function(err, doc1) {
                    if (err ) {
                        handleError(res, err.message, "Failed to get contact");
                    }
                    else if (doc1.password === oldPassword.toString()) {
                        db.collection(USERS_COLLECTION).updateOne({ email: userEmail }, {$set : { password : newPassword}}, function(err, doc) {
                            if (err) {
                                handleError(res, err.message, "Failed to get contact");
                            } else {

                                var r = {
                                    status  : 200,
                                    success : 'Password Changed Successfully'
                                }
                                res.end(JSON.stringify(r));
                            }


                        });
                    }
                    else {

                        console.log('unable to change password due to mismatch');
                        res.send('unable to change password');
                    }

                });
            }


        });

    app.post("/signin", function(req, res) {
        var userEmail = req.body.email;
        var userPassword = req.body.password;
        console.log(userEmail);
        currentEmail = userEmail;
        db.collection(USERS_COLLECTION).findOne({ email: userEmail }, function(err, doc) {
            if (err) {
              handleError(res, err.message, "Failed to get contact");
            } else {

                if (doc && userPassword.toString() === doc.password) {
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

      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = true;
      console.log("before /uploads");
      // store all uploads in the /uploads directory
      form.uploadDir = path.join(__dirname, '/uploads');

      // every time a file has been uploaded successfully,
      // rename it to it's orignal name

        function getText(callback1, callback2) {
            form.on('file', function(field, file) {
                fs.rename(file.path, path.join(form.uploadDir, file.name));
                fs.readFile(path.join(form.uploadDir, file.name), 'utf8', function(err, data) {
                  if (err) throw err;

                  text = data;
                  //console.log('in getText(), assign text to ' + text);
                  callback1(callback2);
                });
            });
        }

        function sendResponse(callback) {
            //console.log('in sendResponse(), text is ' + text);
            callback();
            var email = req.body.email;
            console.log('currentEmail is ' + currentEmail);


                //console.log("I am sending this back: " + JSON.stringify(r2));
                db.collection(USERS_COLLECTION).updateOne({ email : currentEmail }, {$set : { sentence : eventSentence, source : text}}, function(err, doc) {
                    if (err) {
                          handleError(res, err.message, "Failed to send response");

                    } else {
                            console.log('found email' + currentEmail);

                            var r2 = {
                                  status  : 201,
                                  data    : text,
                                  event   : event,
                                  eventSentence : eventSentence,
                                  success : 'Upload Successfully'
                            }
                            res.end(JSON.stringify(r2));
                        }
                });

        }
        function getEvent() {
            SummaryTool.summarize(event, text, function(err, summary) {
                if(err) console.log("Something went wrong man!");
                console.log("Original Length " + (text.length));
                console.log("Summary Length " + summary.length);
                console.log("Summary Ratio: " + (100 - (100 * (summary.length / text.length))));
                event = ' ';
                eventSentence = summary;
            });



        }

        getText(sendResponse, getEvent);

      // log any errors that occur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });


      // parse the incoming request containing the form data
      form.parse(req);




    });

};