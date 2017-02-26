var express=require('express');
var rpio = require('rpio');
var app=express();

app.get('/switch',function (req,res) {
//if(req.query.val==true)
    On();
res.send("should switch On : " + req.query.val);
})



function On() {

    console.log('inside on');
    rpio.mode(12, rpio.OUTPUT);
    console.log('set the output pin');
    if(rpio.read(12) == rpio.LOW)
        console.log("LED is OFF");
    else
        console.log("LED is ON");

      //  if(rpio.read(12) == rpio.LOW)
            rpio.write(12, rpio.HIGH);
    console.log('pin value is high');

    if(rpio.read(12) == rpio.LOW)
        console.log("LED is OFF");
    else
        console.log("LED is ON");

    //  else
        //    console.log('LED already ON');
        //console.log('Value of Pin3 from Read Pin is ' + rpio.read(12));



}


var server=app.listen(8080,function () {
    console.log('listing at 8080')
})
