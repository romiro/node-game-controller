
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var socketio = require('socket.io');

var app = express();

// all environments
app.set('env', 'development');
app.set('port', 9090);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({
    src: path.join(__dirname, 'public'),
//    compress: true,
//    yuicompress: true,
    force: app.get('env') == 'development'
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.desktop);
app.get('/m', routes.device);


var server = http.createServer(app);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    var io = socketio.listen(server);
    var pool = {
        device: null,
        desktop: null
    };

    io.sockets.on('connection', function(socket){
        socket.on('identify', function(identity){
            socket.set('identity', identity);
            socket.emit('identified', true);
            pool[identity] = socket;

            if (identity == 'device') {
                setupDeviceEvents();
            }
        });


        function setupDeviceEvents() {
            socket.on('orient', function(data){
                pool['desktop'].emit('orient', data);
            });
        }
    });
});
