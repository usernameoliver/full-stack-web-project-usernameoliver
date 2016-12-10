var exec = require('child_process').exec;

exec('java -Xmx10g -cp target/classes:target/dependency/* edu.washington.nsre.extraction.NewsSpikePredict https://s3-us-west-2.amazonaws.com/eventextractionmodelbucket/data/scale/model https://s3-us-west-2.amazonaws.com/eventextractionmodelbucket/data/test  ./predict', function(error, stdout, stderr) {
    console.log(stdout);
});
