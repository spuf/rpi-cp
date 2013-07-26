var express = require('express');
var app = express();
var port = parseInt(process.argv[2]);

app.use(express.static(__dirname + '/public'));

var count = 0;
app.get('/', function(req, res){
	count += 1;
	res.send('raspberry pi. ['+count+']');
});

app.listen(port);
