var fs = require('fs');
var util = require('util');

var config = {
    port: 8080,

    ssl_enabled: true,
    ssl_port: 443,

    data: {
        temp: {
            name: 'Temperature',
            type: 'graph',
            command: function (callback) {
                fs.readFile('/sys/class/thermal/thermal_zone0/temp', function (err, data) {
                    callback(null, err ? 'Unknown' : util.format('%d°C', parseInt(data) / 1000));
                });
            }
        },
        date: {
            name: 'Date',
            type: 'text',
            command: function (callback) {
                callback(null, (new Date()).toString());
            }
        }
    }
};

if (config.ssl_enabled) {
    config.ssl = {
        key: fs.readFileSync('/home/pi/.ssl/ssl'),
        cert: fs.readFileSync('/home/pi/.ssl/ssl.crt'),
        ca: [fs.readFileSync('/home/pi/.ssl/ca.pem'), fs.readFileSync('/home/pi/.ssl/sub.class1.server.ca.pem')]
    };
}

module.exports = config;
