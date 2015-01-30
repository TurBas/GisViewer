(function(sequence) {
    'use strict';

    sequence.getNextVal = getNextVal;

    /////////////////

    var database = require('./database');

    function getNextVal(sequenceName, next){
        database.getDb(function(err, db) {
            if (err) {
                next('Failed to get a database connection. ' + err.message);
            } else {
                db.sequences.findAndModify({ _id: sequenceName }, null, { $inc: { seq: 1 } }, { upsert: true }, function(err, result){
                    if (err) {
                        next('Failed to get the next value of sequence "' +sequenceName + '. ' + err.message);
                    }
                    else {
                        next(null, result.seq);
                    }
                });
            }
        });
    }

}(module.exports));
