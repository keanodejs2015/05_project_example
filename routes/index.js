var express = require('express');
var router = express.Router();

// get home page
// Route to serve the html files, in a single page application like an Angular app
// This will most likely be the only one
router.get('/', function(req, res) {
    res.send('index.html');
});

module.exports = router;