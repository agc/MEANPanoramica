var Wine=require('./modelo_wine')

module.exports.findAll=function(req,res){

    Wine.findAll(function(error,wines) {

        res.send(wines)}) //había json con mysql
}


module.exports.findById= function(req,res) {
    var id= req.params.id

    Wine.findById(id, function (error, wine) {
        console.log("Lega ")
        res.send(wine)
    })
}


module.exports.addWine=function(req,res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    Wine.addWine(wine,function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            console.log('Success: ' + JSON.stringify(result[0]));
            res.send(result[0]);
        }
    })
}

module.exports.updateWine=function(req,res) {
    var wine = req.body;
    var id = req.params.id;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    Wine.updateWine(id, wine,function(err, result) {
        if (err) {
            console.log('Error updating wine: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(wine);
        }
    })
}



module.exports.deleteWine=function(req,res) {
    var wine = req.body;
    var id = req.params.id;
    console.log('deleting wine: ' + id);
    Wine.deleteWine(id, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    })
}

