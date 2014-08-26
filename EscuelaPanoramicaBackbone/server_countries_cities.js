var express         = require('express');
var path            = require('path');
var _                = require('underscore')


var bodyParser  = require('body-parser');

var countries = [
    {id:1,name:"Australia", cities:["Melbourne","Sidney"]},
    {id:2,name:"USA ",      cities:["Los Angeles"]},

];

var suburbs= [
    {name:"Glen Iris",city:"Melbourne"},
    {name:"Brunswick", city:"Melbourne"},
    {name:"Bondi", city:"Sidney"},
    {name:"Compton",city:"Los Angeles"}
]

//Si no se especifica nada muestra las comunidades
// Si se especifica comunidad muestra las provincias
// Si se especifica comunidad y provincia muestra las ciudades

function buscar(country,city) {

    if (country == undefined) {

        var cnts=[]
        for (var i= 0; i<countries.length;i++) {
            var c=countries[i]
            cnts.push({id:c.id,name:c.name})
        }

        return cnts
    }

    if (city==undefined) {
        var indiceObjeto=1

        function crearObjeto(nombre) {
            var objeto={id:indiceObjeto,name:nombre}
            indiceObjeto++;
            return objeto;

        }
        // necesario porque se necesita par valor nombre

        for (var i= 0; i<countries.length;i++) {
            if (countries[i].id == country) {
                var arrayObjetos=_.map(countries[i].cities,crearObjeto)

                return arrayObjetos
            }

        }

    }
    /*
    var ciudades_de_prov=[]

    for (var i=0;i<ciudades.length;i++) {
        if (ciudades[i].provincia === provincia) {
            ciudades_de_prov.push(ciudades[i].nombre)
        }

    }

    return ciudades_de_prov;
    */
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/countries', function (request, response) {

    var countries=buscar()
    response.header('Access-Control-Allow-Origin', '*');

    response.json(countries);

});

app.get('/cities/:country', function (request, response) {
    var cities=buscar(request.params.country)
    response.header('Access-Control-Allow-Origin', '*');

    response.json(cities);

});

app.get('/ciudades/:provincia', function (request, response) {
    var provincias=buscar(0,request.params.provincia)
    response.header('Access-Control-Allow-Origin', '*');

    response.json(provincias);

});














module.exports = app;
