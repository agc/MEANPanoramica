var mongo = require('mongodb');

var Server = mongo.Server,
    Db      = mongo.Db,
    BSON    = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});

db = new Db('winedb', server);

db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'winedb' database");
        db.collection('wines', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
})

var populateDB = function() {

    var wines = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
        }];

    db.collection('wines', function(err, collection) {
        collection.insert(wines, {safe:true}, function(err, result) {});
    });

};