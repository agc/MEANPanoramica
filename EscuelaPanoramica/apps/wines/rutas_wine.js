var express = require('express');
var router = express.Router();

var Wine=require('./ctrl_wine')

/* GET users listing. */
router.get('/',         Wine.findAll);
router.get('/:id',      Wine.findById);
router.post('/',        Wine.addWine);
router.put('/:id',      Wine.updateWine);
router.delete('/:id',   Wine.deleteWine);

module.exports = router;


