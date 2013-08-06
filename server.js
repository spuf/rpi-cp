var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var async = require('async');
var fs = require('fs');
var util = require('util');

var port = process.env.PORT || parseInt(process.argv[2]);

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

io.set('log level', 1);

async.forever(function (callback) {
	if (io.sockets.clients().length > 0) {
		getInfo(function (info) {
			io.sockets.volatile.emit('info', info);
		});
	}
	setTimeout(callback, 1000);
});

io.sockets.on('connection' , function (socket) {
	io.sockets.emit('online', io.sockets.clients().length);

	socket.on('disconnect', function () {
		setTimeout(function () {
			io.sockets.emit('online', io.sockets.clients().length);
		}, 0);
	});
});

function getInfo(callback) {
	async.parallel({
		date: function (callback) {
			callback(null, (new Date()).toString());
		},
		temp: function (callback) {
			fs.readFile('/sys/class/thermal/thermal_zone0/temp', function (err, data) {
				callback(null, err ? 'Unknown' : util.format('%d°C', parseInt(data) / 1000));
			});
		}
	}, function (err, results) {
		callback(results);
	});
}

server.listen(port);
console.log('Started server at port ' + port);
