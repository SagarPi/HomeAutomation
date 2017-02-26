var express=require('express');
require('rpio');
var app=express();

app.get('/switch',function (req,res) {
if(req.query.switch==true)
    On();
})



function On() {

    rpio.mode(12, rpio.OUTPUT);

      //  if(rpio.read(12) == rpio.LOW)
            rpio.write(12, rpio.HIGH);
      //  else
        //    console.log('LED already ON');
        //console.log('Value of Pin3 from Read Pin is ' + rpio.read(12));



}


var server=app.listen(8080,function () {
    console.log('listing at 8080')
})
