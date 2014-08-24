var db= require('./conexion_db')



var mongo = require('mongodb');

var ObjectID=mongo.ObjectID

var    BSON = mongo.BSONPure;

module.exports= {

    findById: function(id,cb) {

        db.collection('wines').findOne({_id: new ObjectID(id)},cb)

    },

    findAll: function(cb) {

        db.collection('wines').find({}).toArray(cb)

    },

    addWine: function(wine,cb) {
        console.log('Adding wine: ' + JSON.stringify(wine));
        db.collection('wines').insert(wine,{safe:true},cb)

    },
    updateWine:function(id, wine,cb) {
        console.log('Updating wine: ' + id);
        console.log(JSON.stringify(wine));
        db.collection('wines').update({'_id':new ObjectID(id)}, wine, {safe:true},cb)
    },

    deleteWine: function(id,cb) {
        console.log('Deleting wine: ' + id);
        db.collection('wines').remove({'_id':new ObjectID(id)}, {safe:true},cb)

    }


}



