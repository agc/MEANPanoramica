var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

