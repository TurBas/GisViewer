(function(helpers) {
    'use strict';

    var urlParser = require('./urlParser.js');
    var capabilitiesParser = require('./capabilitiesParser');

    helpers.urlParser = urlParser;
    helpers.capabilitiesParser = capabilitiesParser;

}(module.exports));