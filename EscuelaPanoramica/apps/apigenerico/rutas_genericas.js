handler=require('./dbgenerico')

exports.rutas=function(router,db) {


    router.param('collectionName', function (req, res, next, collectionName) {
        req.collection = db.collection(collectionName)
        console.log("Detectada " + collectionName)
        return next()
    })

    router.route('/:collectionName')
        .get( handler.getAll)
        .post( handler.post);

    router.route('/:collectionName/:id')
        .get( handler.getById)
        .put( handler.put)
        .delete( handler.delete);


}