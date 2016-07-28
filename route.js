var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app=express();

app.set('port',3000);

app.set('view engine','jade');

app.use(bodyParser.json());

app.get('/clyve',function(req,res){
	console.log('GET Request Recieved');
	res.sendFile('public/index.html',{root:__dirname});
});

app.post('/clyve',function(req,res){
	//connect to user database
	/*var conn = mysql.createConnection({
		host : 'eldritch.csgnyqkchfnk.us-west-2.rds.amazonaws.com',
		user : 'bmader23',
		password : 'Bm950343317!',
		database : 'ClyvePlayer'
	});
	conn.connect();
	conn.end();*/
	
	var validity=0;
	
	//if username and userpw passed in are a valid pair, validity=1
	if(req.body.username && req.body.userpw){
		validity=1;
	}
	
	//send response as json.
	if(validity!=1){
		res.setHeader('Content-Type','application/json');
		res.write(JSON.stringify({'status':validity}));
		res.end();
	}else{
		res.setHeader('Content-Type','application/json');
		res.write(JSON.stringify({'status':validity,'HTML':"teststring"}));
		res.end();
	}
});

app.get('/playClyve',function(req,res){
	res.sendFile('public/game/game.html',{root:__dirname});
});
app.get('/objects',function(req,res){
	res.sendFile('public/game/script/clyveObjectsRef.js',{root:__dirname});
});

//Allows use of static files in public file.
app.use(express.static(__dirname + '/public'));

//Listen on previously defined port.
app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );});