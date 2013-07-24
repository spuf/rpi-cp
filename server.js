var express = require('express');
var app = express();

var count = 0;
app.get('/', function(req, res){
	count += 1;
	res.send('raspberry pi. ['+count+']');
});

app.listen(8080);
