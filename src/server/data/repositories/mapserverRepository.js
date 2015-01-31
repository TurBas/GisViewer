(function(repository) {
    'use strict';
    
    repository.insert = insertMapserver;
    repository.getAll = getAllMapservers;

    /////////////////

    var database = require('../database');
    var sequence = require('../sequence');

    function getAllMapservers(next) {
        database.getDb(function(err, db) {
            if (err) {
                next("Failed to get a database connection. " + err.message);
            } else {
                db.mapservers.find().toArray(function(err, results) {
                    if (err) {
                        next("Failed to get mapservers. " + err.message);
                    }
                    else {
                        next(null, results);
                    }
                });
            }
        });
    }

    function insertMapserver(mapserver, next) {
        database.getDb(function(err, db) {
            if (err) {
                next("Failed to get a database connection. " + err.message);
            } else {
                sequence.getNextVal("mapservers", function(err, nextVal){
                    if (err) {
                        next(err);
                    } else {
                        mapserver.id = nextVal;
                        db.mapservers.insert(mapserver, function (err, result) {
                            if (err) {
                                next("Failed to insert mapserver. " + err.message)
                            }
                            else {
                                next(null, result);
                            }
                        });
                    }
                });
            }
        });
    }

}(module.exports));
