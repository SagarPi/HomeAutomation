var http = require('http');
console.log('Got http object');
url = require('url');
console.log('Got url object');
var rpio = require('rpio');
console.log('Got GPIO object');


var pin = 12;		/* P12/GPIO18 */
var range = 1024;	/* LEDs can quickly hit max brightness, so only use */
var max = 1023;		/*   the bottom 8th of a larger scale */
var clockdiv = 8;	/* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var interval = 5;	/* setInterval timer, speed of pulses */
var times = 5;		/* How many times to pulse before exiting */

rpio.open(pin, rpio.PWM);
console.log('Rpio started. LED is switched off');
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

var direction = 1;
var data = 0;
var pulse = function(){setInterval(function() {
	rpio.pwmSetData(pin, data);
	if (data === 0) {
		direction = 1;
		if (times-- === 0) {
			clearInterval(pulse);
			rpio.open(pin, rpio.INPUT);
			return;
		}
	} else if (data === max) {
		direction = -1;
	}
	data += direction;
}, interval, data, direction, times);};


http.createServer(function(req, res)
{
	console.log('createdServer');
	console.log(req.url);

	if(req.url != '/favicon.ico')
	{
		
		console.log('Start request handling');
		var _get = url.parse(req.url,true).query;
		res.writeHead(200, {'Content-Type': 'text/plain'});
		
		rpio.mode(12, rpio.OUTPUT);
		if( _get['data'] == 'LED_ON')
		{
			console.log('Reading pin 12 if ON');
				if(rpio.read(12) == rpio.LOW)
					rpio.write(12, rpio.HIGH);
				else
					console.log('LED already ON');
			console.log('Value of Pin3 from Read Pin is ' + rpio.read(12));

			
		}
		else if(_get['data'] == 'LED_OFF')
		{
			console.log('Reading pin 12 if OFF');
				if(rpio.read(12) == rpio.HIGH)
					rpio.write(12, rpio.LOW);
				else
					console.log('LED already OFF');
			console.log('Value of Pin12 from Read Pin is ' + rpio.read(12));
		}
		else if(_get['data'] == 'LED_PWMALARM')
		{
			rpio.mode(12, rpio.PWM);

			var direction = 1;
			var data = 0;
			pulse();
			
		}
		else if(_get['data'] == 'LED_PWM')
		{
			console.log('value passed is' + (parseInt(_get['value'])*10));

			rpio.mode(12, rpio.PWM);
			rpio.pwmSetData(12, (parseInt(_get['value'])*10));
		}
		res.end('success');
	}
	else
		res.end();
	console.log('End response');
	
	console.log('listning');
	
}).listen(8080);