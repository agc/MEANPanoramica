var express = require('express');
var router = express.Router();

var TVShowCtrl = require('./ctrl_tvshow');



router.route('/')
    .get(TVShowCtrl.findAllTVShows)
    .post(TVShowCtrl.addTVShow);

router.route('/:id')
    .get(TVShowCtrl.findById)
    .put(TVShowCtrl.updateTVShow)
    .delete(TVShowCtrl.deleteTVShow);

module.exports=router

