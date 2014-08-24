var mongoose = require('mongoose');

/*
mongoose.connect('mongodb://localhost/contactmanager', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});*/

var db= mongoose.createConnection('mongodb://localhost/contactmanager', function(err, res) {
    if(err) throw err;
    console.log('Conectado  a la base de datos');
});

//
module.exports=db


