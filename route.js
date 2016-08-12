var tracker=require("./node_modules/saveTracker.js");

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs=require('fs');

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
	//if(tracker.parseFile("./testfile.txt"))
	//	console.log("No save file available to open.");
	
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
	var saveFile = req.body.userpw+':'+req.body.gamestate.home+':'+req.body.gamestate.difficultySetting+':'+ req.body.gamestate.difficulty + ':' +req.body.gamestate.scrapCnt+':'+req.body.gamestate.score+':';
	saveFile += req.body.gamestate.totalRobots[0]+":"+req.body.gamestate.totalRobots[1]+":"+req.body.gamestate.totalRobots[2]+':'+req.body.gamestate.totalTowers[0]+':';
	saveFile += req.body.gamestate.totalTowers[1]+':'+req.body.gamestate.totalTowers[2]+':';
	saveFile += "SBOT:"
	for(var i = 0;req.body.gamestate.robots.sbots[i];i++){
		var xPos = req.body.gamestate.robots.sbots[i].loc[0].split('%');
		var yPos = req.body.gamestate.robots.sbots[i].loc[1].split('%')
		saveFile += xPos[0]+":"+yPos[0]+":";
	}
	saveFile += "DISBOT:";
	for(var i = 0;req.body.gamestate.robots.disbots[i];i++){
		var xPos = req.body.gamestate.robots.disbots[i].loc[0].split('%');
		var yPos = req.body.gamestate.robots.disbots[i].loc[1].split('%')
		saveFile += xPos[0]+":"+yPos[0]+":";
	}
	saveFile += "ZBOT:";
	for(var i = 0;req.body.gamestate.robots.zbots[i];i++){
		var xPos = req.body.gamestate.robots.zbots[i].loc[0].split('%');
		var yPos = req.body.gamestate.robots.zbots[i].loc[1].split('%')
		saveFile += xPos[0]+":"+yPos[0]+":";
	}
	saveFile += "MINETOWER:";
	for(var i = 0;req.body.gamestate.towers.mineTowers[i];i++){
		var xPos = req.body.gamestate.towers.mineTowers[i].xPos;
		var yPos = req.body.gamestate.towers.mineTowers[i].yPos;
		saveFile += xPos+":"+yPos+":";
	}
	saveFile += "GUNTOWER:";
	for(var i = 0;req.body.gamestate.towers.gunTowers[i];i++){
		var xPos = req.body.gamestate.towers.gunTowers[i].xPos;
		var yPos = req.body.gamestate.towers.gunTowers[i].yPos;
		saveFile += xPos+":"+yPos+":";
	}
	saveFile += "FLAMETOWER:";
	for(var i = 0;req.body.gamestate.towers.flameTowers[i];i++){
		var xPos = req.body.gamestate.towers.flameTowers[i].xPos;
		var yPos = req.body.gamestate.towers.flameTowers[i].yPos;
		saveFile += xPos+":"+yPos+":";
	}
	saveFile += "END";
	
	fs.writeFile("save_data/"+req.body.userid+".txt", saveFile ,function(err){
		console.log(saveFile);
	});
	
	res.setHeader('Content-Type','application/json');
	res.write(JSON.stringify({'status':1}));
	res.end();
});
app.post('/loadFile',function(req,res){
	/*var filecontent = fs.readFile("save_data/"+req.body.userid+".txt", 'utf8', function (err,data) {
		if (err) {
			console.log("Fail to open");
			res.setHeader("Content-Type","text/plain");
			res.write(JSON.stringify({ "fileContent" : data }) );
			res.end();
		}else{
			console.log("Open");
			res.setHeader("Content-Type","text/plain");
			res.write(JSON.stringify({ "fileContent" : data }) );
			res.end();
		}
	});*/
	fs.readFile('save_data/'+req.body.userid+'.txt',function(err,data){
		if(err){
			res.send("NOLOAD");
		}
		else{
			res.sendFile('save_data/'+req.body.userid+'.txt',{root:__dirname});
		}
	});
});
app.get('/sbot_front',function(req,res){
	res.sendFile('public/game/assett/sbot_front/'+req.query.num+'.png',{root:__dirname});
});

app.get('/sbot_back',function(req,res){
	res.sendFile('public/game/assett/sbot_back/'+req.query.num+'.png',{root:__dirname});
});
app.get('/sbot_side',function(req,res){
	res.sendFile('public/game/assett/sbot_side/'+req.query.num+'.png',{root:__dirname});
});
app.get('/sbot_flip',function(req,res){
	res.sendFile('public/game/assett/sbot_flip/'+req.query.num+'.png',{root:__dirname});
});

app.get('/disbot_front',function(req,res){
	res.sendFile('public/game/assett/disbot_front/'+req.query.num+'.png',{root:__dirname});
});
app.get('/disbot_back',function(req,res){
	res.sendFile('public/game/assett/disbot_back/'+req.query.num+'.png',{root:__dirname});
});
app.get('/disbot_side',function(req,res){
	res.sendFile('public/game/assett/disbot_side/'+req.query.num+'.png',{root:__dirname});
});
app.get('/disbot_flip',function(req,res){
	res.sendFile('public/game/assett/disbot_flip/'+req.query.num+'.png',{root:__dirname});
});

app.get('/zbot_front',function(req,res){
	res.sendFile('public/game/assett/zbot_front/'+req.query.num+'.png',{root:__dirname});
});
app.get('/zbot_back',function(req,res){
	res.sendFile('public/game/assett/zbot_back/'+req.query.num+'.png',{root:__dirname});
});
app.get('/zbot_side',function(req,res){
	res.sendFile('public/game/assett/zbot_side/'+req.query.num+'.png',{root:__dirname});
});
app.get('/zbot_flip',function(req,res){
	res.sendFile('public/game/assett/zbot_flip/'+req.query.num+'.png',{root:__dirname});
});
app.get('/clyve_right',function(req,res){
	res.sendFile('public/game/assett/clyve_right/'+req.query.num+'.png',{root:__dirname});
});
app.get('/clyve_left',function(req,res){
	res.sendFile('public/game/assett/clyve_left/'+req.query.num+'.png',{root:__dirname});
});
app.get('/tower',function(req,res){
	res.sendFile('public/game/assett/tower/'+req.query.type+'.png',{root:__dirname});
});
app.get('/mineExplosion',function(req,res){
	res.sendFile('public/game/assett/mine_explosion/'+req.query.num+'.png',{root:__dirname});
});
app.get('/background',function(req,res){
	res.sendFile('public/game/assett/background.png',{root:__dirname});
});
app.get('/house',function(req,res){
	res.sendFile('public/game/assett/house.png',{root:__dirname});
});
//Allows use of static files in public file.
app.use(express.static(__dirname + '/public'));

//Listen on previously defined port.
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );
});