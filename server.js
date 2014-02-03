var config = require('./config');

var express = require('express');
var app = express();

var http = require('http');
var server;
var io = require('socket.io');

if (config.ssl_enabled) {
    server = http.createServer(function (request, response) {
        response.statusCode = 302;
        response.setHeader('Location', 'https://' + request.headers.host + request.url);
        response.end();
    });
    var https = require('https');
    var secureServer = https.createServer(config.ssl, app);
    io = io.listen(secureServer);
} else {
    server = http.createServer(app);
    io = io.listen(server);
}

var async = require('async');

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

io.enable('browser client minification');
io.enable('browser client etag');
io.enable('browser client gzip');
io.set('log level', 1);

async.forever(function (callback) {
    if (io.sockets.clients().length > 0) {
        var tasks = {};
        for (var index in config.data) {
            if (config.data.hasOwnProperty(index)) {
                tasks[index] = config.data[index].command;
            }
        }
        async.parallel(tasks, function (err, results) {
            io.sockets.volatile.emit('info', results);
        });
    }
    setTimeout(callback, 1000);
});

io.sockets.on('connection', function (socket) {
    var tasks = {};
    for (var index in config.data) {
        if (config.data.hasOwnProperty(index)) {
            tasks[index] = {
                name: config.data[index].name,
                type: config.data[index].type
            };
        }
    }
    socket.emit('tasks', tasks);

    io.sockets.emit('online', io.sockets.clients().length);

    socket.on('disconnect', function () {
        socket.broadcast.emit('online', io.sockets.clients().length - 1);
    });
});

server.listen(config.port);
console.log('Started server at port ' + config.port);
if (config.ssl_enabled) {
    secureServer.listen(config.ssl_port);
    console.log('Started secure server at port ' + config.ssl_port);
}
