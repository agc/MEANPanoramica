var express     = require('express');

var bodyParser  = require('body-parser');

var comunidades = [
    {id:"aragon",nombre:"Comunidad Autónoma Aragonesa",provincias:["Zaragoza","Huesca","Teruel"]},
    {id:"navarra",nombre:"Comunidad Foral de Navarra ",provincias:["Navarra"]},
    {id:"catalunia",nombre:"Cataluña",provincias:["Barcelona","Tarragona","Lleida","Girona"]},
    {id:"euskadi",nombre:"Comunidad Autónoma Vasca",provincias:["Alava","Guipuzkoa","Vizcaya"]}
];

var ciudades= [
    {nombre:"Zaragoza",provincia:"Zaragoza"},
    {nombre:"Calatayud", provincia:"Zaragoza"},
    {nombre:"Pamplona", provincia:"Navarra"},
    {nombre:"Tafalla",provincia:"Navarra"}
]

//Si no se especifica nada muestra las comunidades
// Si se especifica comunidad muestra las provincias
// Si se especifica comunidad y provincia muestra las ciudades

function buscar(comunidad,provincia) {
    if (comunidad == undefined) {
        var coms=[]
        for (var i= 0; i<comunidades.length;i++) {
            var com=comunidades[i]
            coms.push({id:com.id,nombre:com.nombre})
        }
        return coms
    }

    if (provincia==undefined) {
        for (var i= 0; i<comunidades.length;i++) {
            if (comunidades[i].id === comunidad) {
                return comunidades[i].provincias
            }

        }

    }
    var ciudades_de_prov=[]

    for (var i=0;i<ciudades.length;i++) {
        if (ciudades[i].provincia === provincia) {
            ciudades_de_prov.push(ciudades[i].nombre)
        }

    }

    return ciudades_de_prov;
    return null

}




var app = express();

app.use(bodyParser.json());

var allowCrossDomain = function(req, response, next) {
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    //res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    if ('OPTIONS' == req.method) {
        response.send(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain)

app.get('/comunidades', function (request, response) {
    var comunidades=buscar()
    response.header('Access-Control-Allow-Origin', '*');
    console.log('In GET function ');
    response.json(comunidades);

});

app.get('/provincias/:comunidad', function (request, response) {
    var provincias=buscar(request.params.comunidad)
    response.header('Access-Control-Allow-Origin', '*');
    console.log('In GET function ');
    response.json(provincias);

});

app.get('/ciudades/:provincia', function (request, response) {
    var provincias=buscar(0,request.params.provincia)
    response.header('Access-Control-Allow-Origin', '*');
    console.log('In GET function ');
    response.json(provincias);

});














module.exports = app;
