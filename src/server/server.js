var http = require('http');
var https = require('https');
var _ = require('underscore');
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

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname  +
    '\nprocess.cwd = ' + process.cwd());
});