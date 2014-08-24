var express = require('express');
var router = express.Router();

var ContactsCtrl = require('./ctrl_contacts');



router.route('/')
    .get(ContactsCtrl.findAllContacts)
    .post(ContactsCtrl.addContact);

router.route('/:id')
    .get(ContactsCtrl.findById)
    .put(ContactsCtrl.updateContact)
    .delete(ContactsCtrl.deleteContact);

module.exports=router