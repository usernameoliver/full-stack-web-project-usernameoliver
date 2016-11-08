fs.stat('foo.txt', function(err, stat) {
    if(err == null) {
        console.log('File exists');
    } else if(err.code == 'ENOENT') {
        // file does not exist
        fs.writeFile('log.txt', 'Some log\n');
    } else {
        console.log('Some other error: ', err.code);
    }
});