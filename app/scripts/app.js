var socket = io.connect('/');

$(function () {

	socket.on('info', function (info) {
		$('#date').text(info.date);
		$('#temp').text(info.temp);
	});

	socket.on('online', function (info) {
		$('#online').text(info);
	});

	socket.on('connect', function() {
		$('#online').text('Connected');
		$('#date').text('...');
		$('#temp').text('...');
	});

	socket.on('disconnect', function() {
		$('#online').text('Disconnected');
	});

});
