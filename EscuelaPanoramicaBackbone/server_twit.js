var express     = require('express');

var bodyParser  = require('body-parser');

var Twit = require('twit')

var client = null;


function connectToTwitter(){
    client = new Twit({
        consumer_key:         'NSPbja9MVSHDm7neZRRSrtznC'
        , consumer_secret:      'NAA084iAW0x640KegtuT5puIE9MalewDepUJ7xITf6QePwDqTR'
        , access_token:         '114794575-HBaDS2lkZhIwjXt1NaBIuHi1NM5iXNSCIOD2DEzY'
        , access_token_secret:  'Fs4IlMHugFrENn10gT2OSPaCEH6FR3wxAUMKHzpaE9Xuc'
    });
}
//get the app to connect to twitter.
connectToTwitter();



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

/**
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile/:id', function(request, response){

    response.header('Access-Control-Allow-Origin', '*');

    client.get('users/show', {screen_name: request.params.id},  function (err, reply) {

        if(err){
            console.log('Error: ' + err);
            response.send(404);

        }
        if(reply){
            /// console.log('Reply: ' + reply);
            response.json(reply);
        }

    });
});

/**
 * Runs a search given a query
 **/
app.get('/search/:query', function (request, response) {

    response.header('Access-Control-Allow-Origin', '*');
    //search term is
    var searchTerm = request.params.query;

    client.get('search/tweets', { q: searchTerm, count: 100 }, function(err, reply) {

        if(err){
            console.log('Error: ' + err);
            response.send(404);

        }
        if(reply){
            // console.log('Reply: ' + reply);
            response.json(reply);
        }

    });


});



/**
 * Returns the twitter timeline for the current user
 **/
app.get('/timeline', function (request, response) {

    response.header('Access-Control-Allow-Origin', '*');
    client.get('statuses/home_timeline', { },  function (err, reply) {

        if(err){
            console.log('Error: ' + err);
            response.send(404);

        }
        if(reply){
            //   console.log('Reply: ' + reply);
            response.json(reply);
        }

    });

    //response.json(books);

});







module.exports = app;
