var express = require('express');
var router = express.Router();

// mongodb
var mongodb = require('mongodb'); // The native mongodb native driver
var ObjectId = require('mongodb').ObjectID; // for use when dealing with the _id in the mogodb
var MongoClient = mongodb.MongoClient;
//var url = 'mongodb://localhost/moviesApi';
var url = 'mongodb://keanode:1234abc@ds042888.mongolab.com:42888/moviesapi'


// more routes for our API will happen here
router.route('/movies')
    .post(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log('Connection established to', url);

                // Get the documents collection
                var collection = db.collection('movies');

                // Insert some users
                collection.insert(req.body, function(err, result) {
                    if (err) {
                        res.status(500).send("An internal error on server ocoured");
                    } else {
                        res.status(201) // 201 means created
                        res.location('/movies/' + result.insertedIds.toString()) // location send to client, client decides whart to do
                        res.json({
                            "message": "movie added"
                        });
                    }
                    //Close connection
                    db.close();
                });
            }
        });
    })
    .get(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log('Connection established to', url);

                var collection = db.collection('movies');

                collection.find().toArray(function(err, items) {
                    res.status(200) // 200 means ok
                    res.json(items);
                });
            }
        });
    });


router.route('/movies/:id')
    .put(function(req, res) {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send(err);
            } else {
                var id = ObjectId(req.params.id);
                console.log(id);
                delete req.body.id;
                var json = req.body;

                var collection = db.collection('movies');


                collection.update({
                    "_id": id
                }, json, {
                    upsert: false
                }, function(err, result) {
                    res.status(204).json();
                });
            }
        });
    })
    .delete(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send(err);
                 } else {

                var collection = db.collection('movies');

                collection.remove({
                    "_id": ObjectId(req.params.id)
                }, {
                    w: 1
                }, function(err, result) {
                    console.log("deleted: " + result);
                    res.status(204) // 204 means no content
                    res.json();
                });
            }
        });
    })
    .get(function(req, res) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log('Connection established to', url);

                var collection = db.collection('movies');

                collection.findOne({
                    "_id": ObjectId(req.params.id)
                }, function(err, result) {
                    res.status(200) // 200 means ok
                    res.json(result);
                });
            }
        });
    });


module.exports = router;
