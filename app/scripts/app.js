$(function () {

    var socket = io.connect('/');

    var tasks = {};

    var task_template = _.template($('#template-task').html());

    socket.on('tasks', function (info) {
        tasks = info;
        _.each(info, function (task, index) {
            task.index = index;
            $('#content').append(task_template(task));
        });
    });
    socket.on('info', function (info) {
        _.each(info, function (value, name) {
            switch (tasks[name].type) {
                case 'ping':
                {
                    $('#' + name).animate({
                        opacity: 0.3
                    }, 200, 'linear', function () {
                        $(this).text(value).animate({
                            opacity: 1
                        }, 300, 'linear');
                    });
                    break;
                }
                default:
                {
                    $('#' + name).text(value);
                }
            }
        });
    });

    socket.on('online', function (info) {
        $('#online').text(info);
    });

    // service connection

    socket.on('connect', function () {
        $('#online').text('Connected');
        $('#content').empty();
        console.info('connect');
    });

    socket.on('error', function (error) {
        $('#online').text('Error');
        console.error('error', error);
    });

    socket.on('disconnect', function () {
        $('#online').text('Disconnected');
        console.error('disconnect');
    });

    socket.on('connect_error', function (error) {
        $('#online').text('Connect error');
        console.error('connect_error', error);
    });
    socket.on('connect_timeout', function () {
        $('#online').text('Connect timeout');
        console.warn('connect_timeout');
    });
    socket.on('reconnect', function (attempt) {
        $('#online').text('Reconnect');
        console.warn('reconnect', attempt);
    });
    socket.on('reconnect_error', function (error) {
        $('#online').text('Reconnect error');
        console.error('reconnect_error', error);
    });
    socket.on('reconnect_failed', function () {
        $('#online').text('Reconnect failed');
        console.error('reconnect_failed');
    });

});
