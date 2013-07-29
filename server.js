var express = require('express');
var crypto = require('crypto');

var app = express();
var port = parseInt(process.argv[2]);

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var count = 0;
var travis = '';

app.get('/', function(req, res){
	count += 1;
	res.send('raspberry pi. ['+count+']<hr>'+travis);
});

app.post('/travis-ci', function(req, res){
  if (req.headers['authorization'] == crypto.createHash('sha256').update('spuf/rpi-cp' + process.env.TRAVIS_TOKEN).digest('hex')) {
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
    } catch (e) {
      console.log('Failed to parse travis notification: ' + JSON.stringify(req.body));
    }
  }
  res.send('OK');
});

app.listen(port);
console.log('Started server at port ' + port);
