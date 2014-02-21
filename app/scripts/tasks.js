/*global App */
'use strict';

App.module('Tasks', function (Tasks, App, Backbone) {

    Tasks.Task = Backbone.Model.extend({
        defaults: {
            type: 'text',
            name: 'Unknown',
            value: 'Unknown value'
        }
    });

    Tasks.TaskList = Backbone.Collection.extend({
        model: Tasks.Task
    });

});
