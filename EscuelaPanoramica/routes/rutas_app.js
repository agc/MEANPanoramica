var routerwine        =  require('../apps/wines/rutas_wine')
var routerraiz        =    require('../apps/rutas_raiz')
var routertvshow      =    require('../apps/tvshow/rutas_tvshow')
var routeremployee    =    require('../apps/employee/rutas_employee')
var routercontacts    =    require('../apps/contacts/rutas_contacts')
var routerproductos   =    require('../apps/productos/rutas_productos')


//define solo los subdominios

module.exports=function(app) {
    app.use('/wines',      routerwine)
   // app.use('/',           routerraiz)
    app.use('/tvshow',     routertvshow)
    app.use('/employee',   routeremployee)
    app.use('/contacts',   routercontacts)
    app.use('/api',         routerproductos)

}
