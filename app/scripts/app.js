$(function () {

    var socket = io.connect('/');

    var tasks = {};

	socket.on('tasks', function (info) {
        tasks = info;
        var task_template = _.template('<p><%= name %>: <strong id="<%= index %>"></strong></p>');
        _.each(info, function (task, index) {
            task.index = index;
            $('#content').append(task_template(task));
        });
	});
	socket.on('info', function (info) {
        _.each(info, function (value, name) {
            switch (tasks[name].type) {
                case 'ping': {
                    $('#'+name).animate({
                        opacity: 0.3
                    }, 200, 'linear', function() {
                        $(this).text(value).animate({
                            opacity: 1
                        }, 300, 'linear');
                    });
                    break;
                }
                default: {
                    $('#'+name).text(value);
                }
            }
        });
	});

	socket.on('online', function (info) {
		$('#online').text(info);
	});

	socket.on('connect', function() {
		$('#online').text('Connected');
        $('#content').empty();
	});

	socket.on('disconnect', function() {
		$('#online').text('Disconnected');
	});

});
