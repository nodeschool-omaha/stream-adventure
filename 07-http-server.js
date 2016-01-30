var http = require('http');
var through = require('through2');

var port = process.argv[2];

var server = http.createServer(function(request, response) {
    if (request.method === 'POST') {
        request.pipe(through(function (buffer, encoding, next) {
            this.push(buffer.toString().toUpperCase());
            next();
        })).pipe(response);
    } else {
        response.end(request.method + ' not supported\n');
    }
});
server.listen(port);
