
var db = require('mongoskin').db('mongodb://localhost:27017/productos', {safe:true})

exports.db=db
