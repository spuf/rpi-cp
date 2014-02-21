/*global App */
'use strict';

App.module('TaskList.Views', function (Views, App, Backbone, Marionette, $) {

    Views.ItemView = Marionette.ItemView.extend({
        tagName: 'p',
        template: '#template-taskItem',

        modelEvents: {
            'change': 'render'
        },

        onRender: function () {
            // animations
            // console.log('TaskList.Views.ItemView -> onRender()');
        }

    });

    Views.ListView = Backbone.Marionette.CollectionView.extend({
        className: 'tasks',
        itemView: Views.ItemView
    });

});
