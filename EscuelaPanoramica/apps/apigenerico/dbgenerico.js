

//antes de usar el middleware se debe dejar en req.collection la coleccion

module.exports={
    getAll:
        function(req, res) {
            req.collection.find({} ,{limit:10, sort: [['_id',-1]]}).toArray(
                function(err, results){
                    if (err)
                        res.send(err);
                    res.send(results)
                })
        },
    getById:
        function(req, res) {
        req.collection.findById(req.params.id, function(e, result){
            if (e)  res.send(e);
            res.send(result)
        })
    },
    post:function(req, res) {
        req.collection.insert(req.body, {}, function(e, results){

            if (e)  res.send(e);
            res.send(results)
        })
    },
    put:function(req, res) {

        req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false},
            function(e, result){
            if (e) res.send(e);
            res.send((result===1)?{msg:'success'}:{msg:'error'})
        })},

    delete:function(req, res) {
        console.log(req.params.id)
        req.collection.remove({_id: new ObjectID.createFromHexString(req.params.id)}, function(e, result){
            if (e) res.send(e);
            res.send((result===1)?{msg:'success'}:{msg:'error'})
        })
    }}
