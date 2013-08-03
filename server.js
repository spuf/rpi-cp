var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var fs = require('fs');

var port = process.env.PORT || parseInt(process.argv[2]);

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var count = 0;

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	count += 1;

	var sendInfo = function () {
		getInfo(function (info) {
			socket.volatile.emit('info', info);
		});
	};
	var handle = setInterval(sendInfo, 1000);
	sendInfo();

	socket.on('disconnect', function () {
		clearInterval(handle);
		count -= 1;
	});
});

function getInfo(callback) {
	var info = {
		online: count,
		date: (new Date()).toString(),
		temp: parseInt(fs.readFileSync('/sys/class/thermal/thermal_zone0/temp')) / 1000
	};
	if (typeof(callback) == 'function') {
		callback(info);
	}
}

server.listen(port);
console.log('Started server at port ' + port);
