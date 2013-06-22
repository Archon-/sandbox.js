var http = require('http');
var server = http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('<html><head><title>Foobar</title></head><body><h1>Hello world!</h1></body></html>');
});
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');