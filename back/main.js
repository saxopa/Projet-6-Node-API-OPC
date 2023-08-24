http = require('http');
app = require('express');

http.createServer(function(req, res, next) {
    console.log('Request received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    next();
}).listen(3000);


app.use.createServer(function(req, res) {
    console.log('Request received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
})