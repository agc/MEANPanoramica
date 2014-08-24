
var routerproductos   =    require('../apps/productos/rutas_productos')
var routerwine        =    require('../apps/wines/rutas_wine')


//define solo los subdominios

module.exports=function(app) {

    app.use('/api',         routerproductos)
    app.use('/wines',       routerwine)

}
