

// var express = require('express');

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Welcome to Sagar Pi');
}).listen(1337, '127.0.0.1');

console.log('Server running on http://127.0.0.1:1337/');
