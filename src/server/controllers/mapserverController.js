(function(mapserverController) {
    'use strict';

    var helpers = require('../helpers');
    var repository = require('../data').repositories.mapserver;
    var url = helpers.urlParser;
    var capabilitiesParser = helpers.capabilitiesParser;

    mapserverController.init = function(app){
        app.get('/api/mapserver', getAllMapservers);
        app.post('/api/mapserver/', addMapserver);
        app.post('/api/mapserver/capabilities', getCapabilities);
        app.post('/api/mapserver/isalive', isAlive);

        /////////////////

        function isAlive(req, res){
            var parsedUrl = url.parse(req.body.url);
            var protocol = parsedUrl.protocol;
            var options = parsedUrl.options;

            res.set('Content-Type', 'application/json');
            var isAliveRequest = protocol.request(options, function(isAliveResponse) {
                res.send({
                    requestOptions: options,
                    isAlive : isAliveResponse.statusCode === 200,
                    statusCode: isAliveResponse.statusCode
                });
            });

            isAliveRequest.on('error', function(e) {
                console.log('error', e);
                res.send({
                    requestOptions: options,
                    isAlive : false,
                    message: e.message
                });
            });

            isAliveRequest.end();


        }

        function getCapabilities(req, res){
            var getCapabilitiesParams = {service: 'wms', version: req.body.version, request: 'GetCapabilities'};

            var parsedUrl = url.parse(req.body.url, getCapabilitiesParams);
            var protocol = parsedUrl.protocol;
            var options = parsedUrl.options;

            var getCapabilitiesRequest = protocol.request(options, function(getCapabilitiesResponse) {
                var data = "";
                getCapabilitiesResponse.setEncoding('utf8');
                getCapabilitiesResponse.on('data', function (chunk) { data += chunk; });

                getCapabilitiesResponse.on('end', function () {
                    capabilitiesParser.parse(data, function(err, result){
                        if (err)
                        {
                            res.status(400).send(err);
                        } else {
                            res.set('Content-Type', 'application/json');
                            res.send(result);
                        }
                    });
                });
            });

            getCapabilitiesRequest.on('error', function(e) {
                console.log('Problem with request: ' + e.message);
            });

            getCapabilitiesRequest.end();
        }

        function addMapserver(req, res) {
            var mapserver = req.body.mapserver;

            repository.insert(mapserver, function(err, result){
                res.set('Content-Type', 'application/json');
                if (err)
                {
                    res.status(400).send(err);
                } else {
                    res.set('Content-Type', 'application/json');
                    res.status(201).send(result);
                }
            });
        }

        function getAllMapservers(req, res){
            repository.getAll(function(err, result){
                res.set('Content-Type', 'application/json');
                if (err)
                {
                    res.status(400).send(err);
                } else {
                    res.set('Content-Type', 'application/json');
                    res.status(200).send(result);
                }
            });
        }
    };

}(module.exports));