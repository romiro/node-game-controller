
if (typeof identity == 'undefined') {
    identity = 'desktop';
}

var socket = io.connect('http://192.168.1.100:9090/');
socket.on('identified', function(status){
    if (status) {
        log('Socket has identified as ' + identity);
    }
});
socket.emit('identify', identity);

window.addEventListener('deviceorientation', orient, true);

function orient(evt) {
    var data = {
        absolute: evt.absolute,
        alpha: evt.alpha,
        beta: evt.beta,
        gamma: evt.gamma
    };
    socket.emit('orient', data);
}

function log(msg) {
    msg = arguments.length == 0 ? [msg] : Array.prototype.slice.call(arguments);
    for (var i=0; i < msg.length; i++) {
        var val = msg[i];
        if (typeof val == 'object') {
            var objInfo = '{ ';
            for (var key in val) {
                if (val.hasOwnProperty(key)) {
                    objInfo += key + ": " + val[key] + " ";
                }
            }
            val = objInfo + " }";
        }
        var li = document.createElement('li');
        var text = document.createTextNode(val);
        li.appendChild(text);
        document.getElementById('log').appendChild(li);
    }
}
