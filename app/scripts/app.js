var socket = io.connect('/');

$(function () {

	socket.on('info', function (info) {
		$('#date').text(info.date);
		$('#temp').text(info.temp);
	});

	socket.on('online', function (info) {
		$('#online').text(info);
	});

});
