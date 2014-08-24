var mongoose = require('mongoose')

var db =require('./conexion_db')

var ContactsSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email_address: String,
    mobile_number : String
});

module.exports=db.model("Contacts",ContactsSchema);
