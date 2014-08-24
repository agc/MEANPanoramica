var db=require('./conexion_productos').db

var express = require('express');
var router = express.Router();

require('../apigenerico/rutas_genericas').rutas(router,db)

module.exports=router
