var express=require('express');
var rpio = require('rpio');
var app=express();

app.get('/switch',function (req,res) {
    console.log('inside on');
    rpio.open(12, rpio.OUTPUT, rpio.LOW);
    console.log('set the output pin');

    if(req.query.val=='true')
        On();
    else
        Off();
    res.send("should switch On : " + req.query.val);
})



function On() {
    check();
    rpio.write(12, rpio.HIGH);
    console.log('pin value is high');
    check();
}


function Off() {
    check();
    rpio.write(12, rpio.LOW);
    console.log('pin value is high');
    check();
}

function check() {
    if(rpio.read(12) == rpio.LOW)
        console.log("LED is OFF");
    else
        console.log("LED is ON");
}


var server=app.listen(8080,function () {
    console.log('listing at 8080')
})
