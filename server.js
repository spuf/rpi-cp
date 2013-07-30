var express = require('express');

var app = express();
var port = process.env.PORT || parseInt(process.argv[2]);

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var count = 0;

app.get('/', function (req, res) {
    count += 1;
    res.send('raspberry pi. [' + count + ']');
});

app.listen(port);
console.log('Started server at port ' + port);
