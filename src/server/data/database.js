(function(database) {
    'use strict';
    
    database.getDb = getDatabase;

    /////////////////

    var mongodb = require('mongodb');
    var mongoUrl = "mongodb://localhost:27017/gisviewer";
    var database = null;

    function getDatabase(next){
        if (database) {
            next(null, database);
        } else {
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
               if (err) {
                   next(err);
               } else {
                   database = {
                       db: db,
                       mapservers : db.collection('mapservers'),
                       sequences : db.collection('sequences')
                   };
                   next(null, database);
               }
            });
        }
    }
    
}(module.exports));