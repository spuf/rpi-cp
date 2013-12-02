var config = require('./config');

var express = require('express');
var app = express();

var http = require('http');
var server;
var io = require('socket.io');

if (config.ssl_enabled) {
    server = http.createServer(function (request, response) {
        console.log(request);
        response.end('ok!');
    });
    var https = require('https');
    var secureServer = https.createServer(config.ssl, app);
    io = io.listen(secureServer);
} else {
    server = http.createServer(app);
    io = io.listen(server);
}
server = http.createServer(function (request, response) {
    response.statusCode = 302;
    response.setHeader('Location', 'https://'+request.headers.host+request.url);
    response.end();
});

var async = require('async');
var util = require('util');

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

io.set('log level', 1);

async.forever(function (callback) {
	if (io.sockets.clients().length > 0) {
        async.parallel({
            date: config.data.date.command,
            temp: config.data.temp.command
        }, function (err, results) {
            io.sockets.volatile.emit('info', results);
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

server.listen(config.port);
console.log('Started server at port ' + config.port);
if (config.ssl_enabled) {
    secureServer.listen(config.ssl_port);
    console.log('Started secure server at port ' + config.ssl_port);
}
