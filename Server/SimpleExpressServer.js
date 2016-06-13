

var express = require('express');

var app = express();

app.get('/Sagar', function (req, res) {
    res.send('hello, Sagar Here');
});

app.listen(1337, function (params) {
    console.log('ready on port 1337');
});