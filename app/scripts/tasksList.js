/*global App */
'use strict';

App.module('TaskList', function (TaskList, App, Backbone, Marionette, $, _) {

    TaskList.Controller = function () {
        this.todoList = new App.Tasks.TaskList();
    };

    _.extend(TaskList.Controller.prototype, {

        start: function () {
            this.showTaskList(this.todoList);
        },

        showTaskList: function (todoList) {
            App.main.show(new TaskList.Views.ListView({
                collection: todoList
            }));
        },

        resetTaskList: function (tasks) {
            _.each(tasks, function (task, id) {
                task.id = task.id || id;
            });
            this.todoList.reset(_.toArray(tasks));
        },

        valueTaskList: function (info) {
            _.each(info, function (value, id) {
                this.todoList.get(id).set({value: value});
            }, this);
        }

    });

    TaskList.addInitializer(function () {

        var controller = new TaskList.Controller();

        App.vent.on('server:tasks', controller.resetTaskList, controller);
        App.vent.on('server:info', controller.valueTaskList, controller);

        controller.start();
    });

});
