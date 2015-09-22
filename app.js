// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // body-parser is used to get post data

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// serve static files
app.use(express.static('public')); // all files in public folder can be served statically

var cors = require('cors');
app.use(cors());

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('A ' + req.method + ' request was made ');
    next(); // make sure we go to the next routes and don't stop here
});

// ROUTES 
// =============================================================================
// require the file ./routes/index.js which contains the route for serving the index.html file
var routes = require('./routes/index');
// routes for API is in the file ./routes/movies.js
var movies = require('./routes/movies');

// REGISTER ROUTES -------------------------------
app.use('/', routes);
// all api routes will be prefixed with /api
app.use('/api', movies);

app.listen(process.env.PORT || 3000, function() {
    console.log('Server listening on port 3000');
    console.log("---------------------------------");
});
