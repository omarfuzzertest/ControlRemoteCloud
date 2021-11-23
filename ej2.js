var request = require('request');
var express = require('express');
var fs = require('fs');
var request2 = require('sync-request');
var compression = require('compression')

var shell = require('shelljs/global');

var five = require("johnny-five");
var board = new five.Board();

var app = express();

//__ CORS __
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(compression());

var server = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

server.listen(8083, function () {
    console.log('ServerGuardias running on 8083 port');
});






// __ Express Server __
app.use('/', express.static(__dirname + '/www'));

var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
var log_stdout = process.stdout;



var foco;

board.on("ready", function() {
  // Create an Led on pin 13
  var led = new five.Led(13);
  // Blink every half second
  foco =led;
  
});





app.post('/service/cambiarEstadoLed', function (req, res) {
    console.log("Servicio consumido POST");
    console.log("/service/cambiarEstadoLed");
    console.log(req.body);

    var datos = req.body;
   
   switch(datos.estado){
        case 'on':
            foco.stop()
            foco.on();
        break;
        case 'off':
            foco.stop()
            foco.off();
        break;
        case 'blink':
            foco.stop()
            foco.blink(200);
        break;
   }
            res.send({
                      "respuesta":"ok"
            }); 
});







