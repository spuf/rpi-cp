var express = require('express');
var crypto = require('crypto');

var app = express();
var port = process.env.PORT || parseInt(process.argv[2]);

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var count = 0;
var travis = '';

app.get('/', function (req, res) {
    count += 1;
    res.send('raspberry pi. [' + count + ']<hr>' + travis);
});

app.post('/travis-ci', function (req, res) {
    if (typeof(process.env.TRAVIS_TOKEN) == 'string') {
        var code = 'spuf/rpi-cp' + process.env.TRAVIS_TOKEN;
        var hash = crypto.createHash('sha256').update(code).digest('hex');
        if (req.headers['authorization'] == hash) {
            try {
                var data = JSON.parse(req.body.payload);
                delete data.author_email;
                delete data.author_name;
                delete data.committer_email;
                delete data.committer_name;
                delete data.config;
                delete data.matrix;
                delete data.repository;
                travis += JSON.stringify(data) + '<br>';
            }
            catch (e) {
                console.log('Failed to parse travis notification: ' + JSON.stringify(req.body));
            }
        }
    }
    res.send('OK');
});

app.listen(port);
console.log('Started server at port ' + port);
