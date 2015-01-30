var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var controllers = require('./controllers');
var port = 1650;

app.use(bodyParser.json());

console.log('About to crank up node');
console.log('PORT=' + port);

controllers.init(app);

app.get('/ping', function(req, res) {
    console.log(req.body);
    res.send('pong');
});

app.use('/', express.static('./src/client/'));
app.use('/', express.static('./'));

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname  +
    '\nprocess.cwd = ' + process.cwd());
});

