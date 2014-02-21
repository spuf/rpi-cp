/*global App */
'use strict';

App.module('Socket', function (Socket, App, Backbone, Marionette, $, _, io) {

    Socket.socket = null;

    Socket.addInitializer(function() {

        Socket.socket = io.connect('/');

        Socket.socket.on('tasks', function (tasks) {
            App.vent.trigger('server:tasks', tasks);
        });
        Socket.socket.on('info', function (info) {
            App.vent.trigger('server:info', info);
        });

        Socket.socket.on('online', function (info) {
            $('#online').text(info);
        });

    });

}, io);
