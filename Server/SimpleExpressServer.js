

var express = require('express');

var app = express();

app.set('view engine', 'js');
app.set('views', path.join(__dirname, 'views'));

app.get('/Sagar', function (req, res) {
    res.send('hello, Sagar Here');
});

app.listen(1337, function () {
    console.log('ready on port 1337');
});