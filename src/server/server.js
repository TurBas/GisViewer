var http = require('http');
var https = require('https');
var _ = require('underscore');
var xmlParser = require('xml2js').parseString;
var querystring = require('querystring');
var url = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 1650;

app.use(bodyParser.json());

console.log('About to crank up node');
console.log('PORT=' + port);

app.get('/ping', function(req, res) {
    console.log(req.body);
    res.send('pong');
});

app.use('/', express.static('./src/client/'));
app.use('/', express.static('./'));

app.post('/api/mapserver/isalive', function(req, res){
    var requestUrl = req.body.url;

    var parsedUrl = url.parse(requestUrl, true);
    var protocol = parsedUrl.protocol == 'https:' ? https : http;
    var query = parsedUrl.query ? ('?' + querystring.stringify(parsedUrl.query)) : '';

    var options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: (parsedUrl.pathname ? parsedUrl.pathname : '') + query + (parsedUrl.hash ? parsedUrl.hash : '') ,
        method: 'GET'
    };

    res.set('Content-Type', 'application/json');
    var isAliveRequest = protocol.request(options, function(isAliveResponse) {
        res.send({
            requestOptions: options,
            isAlive : isAliveResponse.statusCode === 200,
            statusCode: isAliveResponse.statusCode
        });
    });

    isAliveRequest.on('error', function(e) {
        res.send({
            requestOptions: options,
            isAlive : false,
            message: e.message
        });
    });

    isAliveRequest.end();
});

app.post('/api/mapserver/capabilities', function(req, res){
    var requestUrl = req.body.url;
    var requestVersion = req.body.version;

    var parsedUrl = url.parse(requestUrl, true);
    parsedUrl.query.service = 'wms';
    parsedUrl.query.version = requestVersion;
    parsedUrl.query.request = 'GetCapabilities';

    var protocol = parsedUrl.protocol == 'https:' ? https : http;
    var query = parsedUrl.query ? ('?' + querystring.stringify(parsedUrl.query)) : '';

    var options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        path: (parsedUrl.pathname ? parsedUrl.pathname : '') + query + (parsedUrl.hash ? parsedUrl.hash : '') ,
        method: 'GET'
    };


    var getCapabilitiesRequest = protocol.request(options, function(getCapabilitiesResponse) {
        var data = "";
        getCapabilitiesResponse.setEncoding('utf8');
        getCapabilitiesResponse.on('data', function (chunk) {
            data += chunk;
        });
        getCapabilitiesResponse.on('end', function () {
            xmlParser(data, function(err, result){
                if (result && result.WMS_Capabilities) {
                    var root = result.WMS_Capabilities;
                    var service = root.Service[0];
                    var keywordsList = (service.KeywordList && service.KeywordList.length) ? service.KeywordList[0].Keyword : [];
                    console.log(keywordsList);
                    var capabilities = {
                        abstract: service.Abstract,
                        keywords: _.map(keywordsList, function (val) {
                            return val.trim()
                        }),
                        title: service.Title[0],
                        version: root.$.version
                    };
                    res.set('Content-Type', 'application/json');
                    res.send(capabilities);
                } else {
                    res.sendStatus(400);
                }
            });
        });
    });

    getCapabilitiesRequest.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    getCapabilitiesRequest.end();

    //res.set('Content-Type', 'application/json');
    //res.send({
    //    title: 'Dummy WMS Server',
    //    abstract: 'Not implemented on the server yet.'
    //});
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname  +
    '\nprocess.cwd = ' + process.cwd());
});