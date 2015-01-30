(function(data) {
    'use strict';

    var repositories = require('./repositories');
    var sequences = require('./sequence');

    data.repositories = repositories;
    data.sequences = sequences;

}(module.exports));