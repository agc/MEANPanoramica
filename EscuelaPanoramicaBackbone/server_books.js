var express     = require('express');

var bodyParser  = require('body-parser');

var bookId      = 100;


function findBook(id){
    for(var i =0; i < books.length; i++){
        if(books[i].id === id){
            return books[i];
        }
    }
    return null;

}

function removeBook(id){
    var bookIndex = 0;
    for(var i=0; i < books.length; i++){
        if(books[i].id === id){
            bookIndex = i;
        }
    }
    books.splice(bookIndex, 1);
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

app.get('/books', function (request, response) {

    response.header('Access-Control-Allow-Origin', '*');
    console.log('In GET function ');
    response.json(books);

});

app.get('/books/:id', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    console.log('Getting a  book with id ' + request.params.id);
    var book = findBook(parseInt(request.params.id,10));
    if(book === null){
        response.send(404);
    }
    else{
        response.json(book);
    }

});

app.post('/books/', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');

    var book = request.body;
    console.log('Saving book with the following structure ' + JSON.stringify(book));
    book.id = bookId++;
    books.push(book);
    response.send(book);

});

app.put('/books/:id', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    var book = request.body;
    console.log('Updating  Book ' + JSON.stringify(book));
    var currentBook = findBook(parseInt(request.params.id,10));
    if(currentBook === null){
        response.send(404);
    }
    else{
        //save the book locally
        currentBook.title = book.title;
        currentBook.year = book.year;
        currentBook.author = book.author;

        response.send(book);
    }
});

app.delete('/books/:id', function (request, response) {
    console.log('calling delete');
    response.header('Access-Control-Allow-Origin', '*');
    var book = findBook(parseInt(request.params.id,10));
    if(book === null){
        console.log('Could not find book');
        response.send(404);
    }
    else
    {
        console.log('Deleting ' + request.params.id);
        removeBook(parseInt(request.params.id, 10));
        response.send(200);
    }
    response.send(200);

});










module.exports = app;
