var tracker=require("./node_modules/saveTracker.js");

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
	
	//Test opening saved file with call from saveTracker.js.
	if(tracker.parseFile("./testfile.txt"))
		console.log("No save file available to open.");
	
	var validity=0;
	
	//If username and userpw passed in are a valid pair, validity=1
	if(req.body.userid && req.body.userpw){
		validity=1;
	}
	
	//send response as json.
	if(validity!=1){
		res.setHeader('Content-Type','application/json');
		res.write(JSON.stringify({'status':validity}));
		res.end();
	}else{
		res.setHeader('Content-Type','application/json');
		res.write(JSON.stringify({'status':validity}));
		res.end();
	}
});

app.get('/playClyve',function(req,res){
	res.sendFile('public/game/game.html',{root:__dirname});
});
app.get('/objects',function(req,res){
	res.sendFile('public/game/script/clyveObjectsRef.js',{root:__dirname});
});
app.get('/menu',function(req,res){
	res.sendFile('public/game/script/menu.js',{root:__dirname});
});
app.get('/tracker',function(req,res){
	res.sendFile('public/game/script/saveTracker.js',{root:__dirname});
});
app.post('/saveFile',function(req,res){
	tracker.saveFile(req.body.userid+".txt");
	res.setHeader('Content-Type','application/json');
	res.write(JSON.stringify({'status':1}));
	res.end();
});


//Allows use of static files in public file.
app.use(express.static(__dirname + '/public'));

//Listen on previously defined port.
app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );});