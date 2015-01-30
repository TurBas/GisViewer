(function(controllers) {
    'use strict';

    var mapserverController = require('./mapserverController.js');

    controllers.init = function(app){
        mapserverController.init(app);
    };

}(module.exports));
