
var mongoose = require('mongoose');

var Contacts  = require('./modelo_contacts')






exports.findById=function(req,res) {

    var id = req.params.id;
    Contacts.findById(id, function(err, contact) {
        if(err) throw err;


        res.send(contact);
    });
}



exports.findAllContacts=function(req,res) {
    Contacts.find({},function(err,docs){
        if(err) throw err;
        res.send(docs);
    });
}

exports.addContact=function(req,res) {
    var contact = new Contacts({
        first_name      :   req.body.first_name,
        last_name       :   req.body.last_name,
        email_address   :   req.body.email_address,
        mobile_number   :   req.body.mobile_number
    }).save(function(err,docs){
            if(err) throw err;
            res.send(docs);
        });

}

exports.updateContact=function(req,res) {

    var id = req.params.id;

    Contacts.findById(id, function(err, contact) {
        if(err) throw err;

            contact.first_name      = req.body.first_name
            contact.last_name       = req.body.last_name
            contact.email_address   = req.body.email_address
            contact.mobile_number   = req.body.mobile_number

            contact.save(function(err) {
                if(err) throw err;
                res.send(contact);
            });
    });
}

exports.deleteContact=function(req,res) {
   var id = req.params.id

    Contacts.findById(id, function(err, contact) {
        contact.remove(function(err) {
            if(err) throw err;

        })})

}




