//Author: Benjamin Frishman & 
//Description: Class objects for clyve
//Date: 7-6-16

//Clyve character object, default position center of first row
//****************************************************************************
function Clyve (type) {
	this.type = type;
	this.loc = [50, 60];
	this.playerFrame=0;
	this.frameCounter=0;
}

Clyve.prototype.playerAnimation=function(gs){
	if(document.getElementById("player")){
		
		document.getElementById("player").innerHTML="";
		if(!gs.leftMove && !gs.rightMove && !gs.upMove && !gs.downMove){
			document.getElementById("player").appendChild(gs.visualStore.clyveRight[0]);
			this.frameCounter=0;
			this.playerFrame=0;
		}else if(gs.leftMove){
			this.frameCounter++;
			if(this.frameCounter > 3){
				this.playerFrame++;
				this.frameCounter=0;
			}
			document.getElementById("player").appendChild(gs.visualStore.clyveLeft[this.playerFrame]);
		}else if(gs.rightMove){
			this.frameCounter++;
			if(this.frameCounter > 3){
				this.playerFrame++;
				this.frameCounter=0;
			}
			document.getElementById("player").appendChild(gs.visualStore.clyveRight[this.playerFrame]);
		}else{
			this.frameCounter++;
			if(this.frameCounter > 3){
				this.playerFrame++;
				this.frameCounter=0;
			}
			document.getElementById("player").appendChild(gs.visualStore.clyveRight[this.playerFrame]);			
		}
		if(this.playerFrame>6){
			this.playerFrame=0;
		}
	}
};

//Next few functions move clyve right, left, up and down.
Clyve.prototype.moveR = function(Inc) {
	var x = this.loc[0];
	var y = this.loc[1];	
	if(x < 99){ //check that clyve is not in the rightmost positions
		this.loc = [x+Inc,y];//"moving"
	}
};

Clyve.prototype.moveL = function(Inc) {
	var x = this.loc[0];
	var y = this.loc[1];	
	if(x > 1){ //check that clyve is not in the leftmost positions
		this.loc = [x-Inc,y];//"moving"
	}
};

Clyve.prototype.moveD = function(Inc) {
	var x = this.loc[0];
	var y = this.loc[1];	
	if(y < 94){ //check that clyve is not in the lowest positions
		this.loc=[x,y+Inc];//"moving" moveXIncrement*($("#game_panel").width() / $("#game_panel").height()) in source atm... test first...
	}
};

Clyve.prototype.moveU = function(Inc) {
	var x = this.loc[0];
	var y = this.loc[1];	
	if(y > 6){ //check that clyve is not in the uppermost positions
		this.loc=[x,y-Inc];//"moving"
	}
};

function Robot(x,y,gs){
	this.loc=[x,y];
	
	this.startPos;
	if(y==="0%"){
		this.startPos=0;
	}else if(y==="100%"){
		this.startPos=2;
	}
	else if(x==="0%"){
		this.startPos=3;
	}
	else{
		this.startPos=1;
	}
	
	this.animateFrame=0;
	this.currentFrameStatus=0;
	
	this.bot = document.createElement("DIV");
	
	this.bot.id = this.towerName;
	document.getElementById("game_panel").appendChild(this.bot);
	this.bot.style.position = "absolute";
	this.bot.style.height = "4em";
	this.bot.style.width = "2em";
	this.bot.style.left = x;
	this.bot.style.top = y;
	this.bot.style.transform = "translate(-50%,-50%)"
	
	this.bot_pic = gs.visualStore.sbotFront[this.animateFrame].cloneNode(true);
	this.bot.appendChild(this.bot_pic);
}

Robot.prototype.move = function(gs){
	this.frameUpdate(gs);
	
	var x = this.loc[0];
	var y = this.loc[1];
	
	var tempX = Number(x.slice(0, x.length - 1));
	var tempY = Number(y.slice(0, y.length - 1));
	
	var quadrant=this.quadrantFinder(tempX,tempY);
	var moveRatio;
	
	var rise = tempY - 50;
	var run = tempX - 50;
	
	if(rise<0) rise *= -1;
	if(run<0) run *= -1;
	
	if( (rise<=1) && (run <= 1 ) ){
		return 1;
	}
	else if(quadrant!=-1){
		if( (rise/run) < 1 ){
			moveRatio = rise/run;
			moveY = (moveRatio / (moveRatio + 1))*this.speed;
			moveX = this.speed - moveY;
		}
		else{
			moveRatio = run/rise;
			moveX = (moveRatio / (moveRatio + 1))*this.speed;
			moveY = this.speed - moveX;
		}
		
		switch(quadrant){
			case 1:
				moveX*=-1;
				moveY*=-1;
			case 2:
				moveX*=-1;
			case 3:
				moveX*=-1;
				moveY*=-1;
		}
	}
	else if(rise==0){
		if(tempX==0){
			moveX=this.speed;
		}else{
			moveX=-this.speed;
		}
		moveY=0;
	}
	else if(run==0){
		if(tempY==0)
			moveY=this.speed;
		else
			moveY=-this.speed;
		moveX = 0;
	}
	
	x = (tempX + moveX) + "%";
	y = (tempY + moveY) + "%";
	this.loc = [x, y];
	
	document.getElementById(this.towerName).style.left = x;
	document.getElementById(this.towerName).style.top = y;
	
	$("#"+this.towerName).zIndex=tempY;
	
	return 0;
};
Robot.prototype.quadrantFinder=function(x,y){
	if(x > 50 && y > 50){
		return 3;
	}	
	else if(x < 50 && y > 50){
		return 2;
	}
	else if(x < 50 && y < 50){
		return 0;
	}
	else if(x > 50 && y < 50){
		return 1;
	}
	return -1;
}

function zbot (x, y, gs) {
	this.speed=.2;
	this.health=2000*gs.difficulty;
	
	this.zigCount=0;
	
	this.towerName = "zbot" + gs.totalRobots[0]++;
	
	Robot.call(this,x,y,gs);
}

zbot.prototype=Object.create(Robot.prototype);

zbot.prototype.frameUpdate=function(gs){
	if(this.currentFrameStatus < 4){
		this.currentFrameStatus++;
	}
	else{
		this.currentFrameStatus=0;
		if(this.animateFrame < 6){
			this.animateFrame++;
		}else{
			this.animateFrame=0;
		}
		
		var prev_pic = this.bot_pic;
		if(this.startPos==0)
			this.bot_pic=gs.visualStore.zbotFront[this.animateFrame].cloneNode(true);
		else if(this.startPos==1){
			this.bot_pic=gs.visualStore.zbotFlip[this.animateFrame].cloneNode(true);
			
		}else if(this.startPos==2)
			this.bot_pic=gs.visualStore.zbotBack[this.animateFrame].cloneNode(true);
		else
			this.bot_pic=gs.visualStore.zbotSide[this.animateFrame].cloneNode(true);
		this.bot.replaceChild(this.bot_pic,prev_pic);
	}
};

zbot.prototype.move=function(gs){
	this.frameUpdate(gs);
	
	var x = this.loc[0];
	var y = this.loc[1];
	
	var tempX = Number(x.slice(0, x.length - 1));
	var tempY = Number(y.slice(0, y.length - 1));
	
	var quadrant=this.quadrantFinder(tempX,tempY);
	var moveRatio;
	
	var rise = tempY - 50;
	var run = tempX - 50;
	var tangX;
	var tangY;
	var tangRatio;
	
	if(rise<0) rise *= -1;
	if(run<0) run *= -1;
	
	if( (rise<=1) && (run <= 1 ) ){
		return 1;
	}
	else if(quadrant!=-1){
		if( (rise/run) < 1 ){
			moveRatio = rise/run;
			moveY = (moveRatio / (moveRatio + 1))*this.speed;
			moveX = this.speed - moveY;
			tangRatio = (run/rise);
			tangX = (tangRatio / (tangRatio+1)) * this.speed;
			tangY = this.speed - tangX;
		}
		else{
			moveRatio = run/rise;
			moveX = (moveRatio / (moveRatio + 1))*this.speed;
			moveY = this.speed - moveX;
			tangRatio = (rise/run)*this.speed;
			tangY = (tangRatio / (tangRatio+1)) * this.speed;
			tangX = this.speed - tangY;
		}
	}
	else if(rise==0){
		if(tempX==0){
			moveX=this.speed;
		}else{
			moveX=-this.speed;
		}
		moveY=0;
	}
	else if(run==0){
		if(tempY==0)
			moveY=this.speed;
		else
			moveY=-this.speed;
		moveX = 0;
	}
	
	switch(quadrant){
		case 1:
			moveX*=-1;
			break;
		case 2:
			moveY*=-1;
			break;
		case 3:
			moveX*=-1;
			moveY*=-1;
			break;
	}
	
	if(this.zigCount < 200){
		if((this.zigCount<50)||(this.zigCount>=150)){
			switch(this.startPos){
				case 0:
					moveX+=this.speed;
					break;
				case 1:
					moveY+=this.speed;
					break;
				case 2:
					moveX-=this.speed;
					break;
				case 3:
					moveY-=this.speed;
			}
		}else{
			switch(this.startPos){
				case 0:
					moveX-=this.speed;
					break;
				case 1:
					moveY-=this.speed;
					break;
				case 2:
					moveX+=this.speed;
					break;
				case 3:
					moveY+=this.speed;
			}
		}
		this.zigCount++;
	}else{this.zigCount=0;}
	
	x = (tempX + moveX) + "%";
	y = (tempY + moveY) + "%";
	this.loc = [x, y];
	
	document.getElementById(this.towerName).style.left = x;
	document.getElementById(this.towerName).style.top = y;

	$("#"+this.towerName).zIndex=tempY;
	
	return 0;
}

//straight bot: charges straight in
function sbot (x, y, gs) {
	this.speed=.2;
	this.health=2500*gs.difficulty;
	this.towerName = "sbot" + gs.totalRobots[0]++;
	Robot.call(this,x,y,gs);
}

sbot.prototype=Object.create(Robot.prototype);

sbot.prototype.frameUpdate=function(gs){
	if(this.currentFrameStatus < 4){
		this.currentFrameStatus++;
	}
	else{
		this.currentFrameStatus=0;
		if(this.animateFrame < 6){
			this.animateFrame++;
		}else{
			this.animateFrame=0;
		}
		
		var prev_pic = this.bot_pic;
		if(this.startPos==0)
			this.bot_pic=gs.visualStore.sbotFront[this.animateFrame].cloneNode(true);
		else if(this.startPos==1){
			this.bot_pic=gs.visualStore.sbotFlip[this.animateFrame].cloneNode(true);
		}else if(this.startPos==2)
			this.bot_pic=gs.visualStore.sbotBack[this.animateFrame].cloneNode(true);
		else
			this.bot_pic=gs.visualStore.sbotSide[this.animateFrame].cloneNode(true);
		this.bot.replaceChild(this.bot_pic,prev_pic);
	}
};

//disarm bot: charges in straight and disarms the first tower it comes into contact with (dies?)
function disbot (x, y, gs) {
	this.speed=.1;
	this.health=2000*gs.difficulty;
	this.towerName = "disbot" + gs.totalRobots[0]++;
	Robot.call(this,x,y,gs);
}

disbot.prototype=Object.create(Robot.prototype);

disbot.prototype.frameUpdate=function(gs){
	if(this.currentFrameStatus < 4){
		this.currentFrameStatus++;
	}
	else{
		this.currentFrameStatus=0;
		if(this.animateFrame < 6){
			this.animateFrame++;
		}else{
			this.animateFrame=0;
		}
		
		var prev_pic = this.bot_pic;
		if(this.startPos==0)
			this.bot_pic=gs.visualStore.disbotFront[this.animateFrame].cloneNode(true);
		else if(this.startPos==1){
			this.bot_pic=gs.visualStore.disbotFlip[this.animateFrame].cloneNode(true);
			
		}else if(this.startPos==2)
			this.bot_pic=gs.visualStore.disbotBack[this.animateFrame].cloneNode(true);
		else
			this.bot_pic=gs.visualStore.disbotSide[this.animateFrame].cloneNode(true);
		this.bot.replaceChild(this.bot_pic,prev_pic);
	}
};

//Define tower constructors and creator (function kept this mostly the same for compatability with your ui but maybe should split it up a bit...)
//updated to pass in x,y though not 100% sure that is correct yet... temp.
function mineTower(x, y, gs){
	this.towerName="mineTower"+gs.totalTowers[0]++;
	this.xPos=x;
	this.yPos=y;
	this.range=5;
	
	this.fireCounter=0;
	this.fireRate=0;
	this.explode=0;
	
	//likely have to sepperate these parts...107-119 as well as the other towers
	this.tower = document.createElement("DIV");
	this.tower.id = this.towerName;
	document.getElementById("game_panel").appendChild(this.tower);
	this.tower.style.position = "absolute";
	this.tower.style.height = "2em";
	this.tower.style.width = "2em";
	this.tower.style.left = x+"%";
	this.tower.style.top = y+"%";
	this.tower.style.transform = "translate(-50%,-50%)"
	
	this.towerDesign = gs.visualStore.mine.cloneNode();
	this.tower.appendChild(this.towerDesign);
	
	this.tower.style.zIndex='"'+y+'"';
}
mineTower.prototype.attackIncoming=function(gs,j){
	for(var i=0;gs.robots.zbots[i];i++){
		if(rangeFinder(this.xPos,this.yPos,gs.robots.zbots[i].loc[0],gs.robots.zbots[i].loc[1]) < this.range){
			gs.robots.zbots[i].health-=100;
			this.explode=1;
		}
	}
	for(var i=0;gs.robots.sbots[i];i++){
		if(rangeFinder(this.xPos,this.yPos,gs.robots.sbots[i].loc[0],gs.robots.sbots[i].loc[1]) < this.range){
			gs.robots.sbots[i].health-=100;
			this.explode=1;
		}
	}
	for(var i=0;gs.robots.disbots[i];i++){
		if(rangeFinder(this.xPos,this.yPos,gs.robots.disbots[i].loc[0],gs.robots.disbots[i].loc[1]) < this.range){
			gs.removeMineTower(gs.towers.mineTowers,j);		
		}
	}
	
	if(this.explode>=1){
		if((this.explode%4)==0){
			var tempDesign = gs.visualStore.mineExplosion[this.explode%3].cloneNode();
			this.tower.replaceChild(tempDesign,this.towerDesign);
			this.towerDesign = tempDesign;
			if(this.explode>=24){
				gs.removeMineTower(gs.towers.mineTowers,j);
			}
		}
		this.explode++;
	}
}

function gunTower(x, y, gs){
	this.towerName="gunTower"+gs.totalTowers[1]++;
	this.xPos=x;
	this.yPos=y;
	this.range=20;
	this.cooldown=25;
	
	this.tower = document.createElement("DIV");
	this.tower.id=this.towerName;
	document.getElementById("game_panel").appendChild(this.tower);
	this.tower.style.position = "absolute";
	this.tower.style.height = "4em";
	this.tower.style.width = "2em";
	this.tower.style.left = x+"%";
	this.tower.style.top = y+"%";
	this.tower.style.transform = "translate(-50%,-50%)"
	
	this.towerDesign = gs.visualStore.guntower.cloneNode();
	this.tower.appendChild(this.towerDesign);
	
	this.tower.style.zIndex='"'+y+'"';
}
gunTower.prototype.attackIncoming=function(gs){
	this.cooldown--;
	if(this.cooldown < 1){
		this.cooldown=25;
		for(var i=0;gs.robots.disbots[i];i++){
			if(rangeFinder(this.xPos,this.yPos,gs.robots.disbots[i].loc[0],gs.robots.disbots[i].loc[1]) < this.range){
				gs.robots.disbots[i].health-=10;
				return;
			}
		}
		for(var i=0;gs.robots.zbots[i];i++){
			if(rangeFinder(this.xPos,this.yPos,gs.robots.zbots[i].loc[0],gs.robots.zbots[i].loc[1]) < this.range){
				gs.robots.zbots[i].health-=10;
				return;
			}
		}
		for(var i=0;gs.robots.sbots[i];i++){
			if(rangeFinder(this.xPos,this.yPos,gs.robots.sbots[i].loc[0],gs.robots.sbots[i].loc[1]) < this.range){
				gs.robots.sbots[i].health-=10;
				return;
			}
		}
	}
}
function flameTower(x, y, gs){
	this.towerName="flameTower"+gs.totalTowers[2]++;
	this.xPos=x;
	this.yPos=y;
	this.range=10;
	this.cooldown=30;
	
	this.tower = document.createElement("DIV");
	this.tower.id=this.towerName;
	document.getElementById("game_panel").appendChild(this.tower);
	this.tower.style.position = "absolute";
	this.tower.style.height = "4em";
	this.tower.style.width = "2em";
	this.tower.style.left = x+"%";
	this.tower.style.top = y+"%";
	this.tower.style.transform = "translate(-50%,-50%)"
	
	this.towerDesign = gs.visualStore.flametower.cloneNode();
	this.tower.appendChild(this.towerDesign);
	
	this.tower.style.zIndex='"'+y+'"';
}
flameTower.prototype.attackIncoming=function(gs){
	this.cooldown--;
	if(this.cooldown < 1){
		this.cooldown=25;
		for(var i=0;gs.robots.disbots[i];i++){
			if(rangeFinder(this.xPos,this.yPos,gs.robots.disbots[i].loc[0],gs.robots.disbots[i].loc[1]) < this.range){
				gs.robots.disbots[i].health-=13;		
			}
		}
		for(var i=0;gs.robots.zbots[i];i++){
			if(rangeFinder(this.xPos,this.yPos,gs.robots.zbots[i].loc[0],gs.robots.zbots[i].loc[1]) < this.range){
				gs.robots.zbots[i].health-=13;
			}
		}
		for(var i=0;gs.robots.sbots[i];i++){
			if(rangeFinder(this.xPos,this.yPos,gs.robots.sbots[i].loc[0],gs.robots.sbots[i].loc[1]) < this.range){
				gs.robots.sbots[i].health-=13;
			}
		}
	}
}

//the gamestate with all objects combined
//uses: gamestate.p.moveR() to move right etc...
function Gamestate (type) {
	this.type = type;
	this.home = 10; //This is the home's hitpoints.
	
	this.p = new Clyve("player");
	
	this.scrapCnt=15;
	this.score=0;
	
	this.leftMove=false;
	this.rightMove=false;
	this.upMove=false;
	this.downMove=false;
	
	this.totalRobots=[0,0,0];
	this.robots={
		sbots:[],
		disbots:[],
		zbots:[]
	}
	this.totalTowers=[0,0,0];
	this.towers={
		mineTowers:[],
		gunTowers:[],
		flameTowers:[]
	}
	this.visualStore=new Visual();
}

Gamestate.prototype.setDifficulty=function(difficulty){
	if(difficulty==="hard"){
		this.difficulty = .02; //highest
		this.difficultyRamping=.006;
	}else if(difficulty==="medium"){
		this.difficulty = .015; //moderate difficulty
		this.difficultyRamping=.005;
	}else{
		this.difficulty = .01;//super easy... too easy
		this.difficultyRamping=.004;
	}
}

Gamestate.prototype.removeMineTower=function(towers,i){
	
	document.getElementById("game_panel").removeChild(towers[i].tower);
	while((i+1)<towers.length){towers[i]=towers[i+1];i++;}
	towers.length--;
	this.totalTowers[0]--;
}

//function to check if game is lost returns 1 if game is over.
Gamestate.prototype.isLost = function() {
	if (this.home == 0){
		return 1;
	}
	else return 0;
};

//gamestate function to create robots.
Gamestate.prototype.genBots = function(robotName, posx, posy) {
	switch(robotName){
		case "sbot":
			this.robots.sbots[this.robots.sbots.length]=new sbot(posx, posy, this);
			return true;
		case "disbot":
			this.robots.disbots[this.robots.disbots.length]=new disbot(posx, posy, this);
			return true;
		case "zbot":
			this.robots.zbots[this.robots.zbots.length]= new zbot(posx, posy, this);
			return true;
	}
	return false;
};

//gamestate function to create robots.
//updated to pass in x, y
Gamestate.prototype.genTower = function(typeName) {
		var posx = this.p.loc[0];
		var posy = this.p.loc[1];		
		switch(typeName){
			case "mineTower":
				if(this.scrapCnt > 0){//if clyve has the scraps
					this.towers.mineTowers[this.towers.mineTowers.length] = new mineTower(posx, posy, this);
					this.scrapCnt -= 1; //arbitrary value, scrap consumption will change
					return true;
				}
				break;
			case "gunTower":
				if(this.scrapCnt > 9){//if clyve has the scraps
					this.towers.gunTowers[this.towers.gunTowers.length] = new gunTower(posx, posy, this);
					this.scrapCnt -= 10; //arbitrary value, scrap consumption will change
					return true;
				}
				break;
			case "flameTower":
				if(this.scrapCnt > 6){//if clyve has the scraps
					this.towers.flameTowers[this.towers.flameTowers.length] = new flameTower(posx, posy, this);
					this.scrapCnt -= 7; //arbitrary value, scrap consumption will change
					return true;
				}
		}
		return false;
};

//gamestate function to move bots
Gamestate.prototype.robotMove = function() {
	for(var i=0;i<this.robots.sbots.length;i++){
		if(this.robots.sbots[i].move(this)){
			document.getElementById("game_panel").removeChild(this.robots.sbots[i].bot);
			while((i+1) < this.robots.sbots.length){this.robots.sbots[i]=this.robots.sbots[++i];}
			this.robots.sbots.length--;
			this.home--;
		}else if(this.robots.sbots[i].health<=0){
			document.getElementById("game_panel").removeChild(this.robots.sbots[i].bot);
			while((i+1) < this.robots.sbots.length){this.robots.sbots[i]=this.robots.sbots[++i];}
			this.robots.sbots.length--;
			this.score++;
			this.scrapCnt++;
		}
	}
	for(var i=0;i<this.robots.disbots.length;i++){
		if(this.robots.disbots[i].move(this)){
			document.getElementById("game_panel").removeChild(this.robots.disbots[i].bot);
			while((i+1) < this.robots.disbots.length){this.robots.disbots[i]=this.robots.disbots[++i];}
			this.robots.disbots.length--;
			this.home--;
		}else if(this.robots.disbots[i].health<=0){
			document.getElementById("game_panel").removeChild(this.robots.disbots[i].bot);
			while((i+1) < this.robots.disbots.length){this.robots.disbots[i]=this.robots.disbots[++i];}
			this.robots.disbots.length--;
			this.score++;
			this.scrapCnt++;
		}
	}
	for(var i=0;i<this.robots.zbots.length;i++){
		if(this.robots.zbots[i].move(this)){
			document.getElementById("game_panel").removeChild(this.robots.zbots[i].bot);
			while((i+1) < this.robots.zbots.length){this.robots.zbots[i]=this.robots.zbots[++i];}
			this.robots.zbots.length--;
			this.home--;
		}else if(this.robots.zbots[i].health<=0){
			document.getElementById("game_panel").removeChild(this.robots.zbots[i].bot);
			while((i+1) < this.robots.zbots.length){this.robots.zbots[i]=this.robots.zbots[++i];}
			this.robots.zbots.length--;
			this.score++;
			this.scrapCnt++;
		}
	}
};

function robotEngine(difficulty,gs){
	var random = Math.random();
	if(random<=difficulty){
		var genSide = Math.floor(Math.random()*4);
		var randPerc = (Math.random()*100+1)+"%";
		switch(genSide){
			case 0://create robot along top edge
				randomRobot(randPerc,"0%",gs);
				return;
			case 1://create robot along right edge
				randomRobot("100%",randPerc,gs);
				return;
			case 2://create robot along bottom edge
				randomRobot(randPerc,"100%",gs);
				return;
			case 3://create robot along left edge
				randomRobot("0%",randPerc,gs);
				return;
		}
	}
}

function randomRobot(leftPerc,topPerc,gs){
	var roboType = Math.floor(Math.random()*3);//changed to only allow single bots temp.
	switch(roboType){
		case 0:
			gs.genBots("sbot",leftPerc,topPerc);
			return;
		case 1:
			gs.genBots("disbot",leftPerc,topPerc);
			return;
		case 2:
			gs.genBots("zbot",leftPerc,topPerc);
			return;
	}
}

function Visual(){
	this.sbotFront=[];
	for(var i=0;i<7;i++){
		this.sbotFront[i]=document.createElement("IMG");
		this.sbotFront[i].style.height="100%";
		this.sbotFront[i].src=("/sbot_front?num="+i);
	}
	this.sbotBack=[];
	for(var i=0;i<7;i++){
		this.sbotBack[i]=document.createElement("IMG");
		this.sbotBack[i].style.height="100%";
		this.sbotBack[i].src=("/sbot_back?num="+i);
	}
	this.sbotSide=[];
	for(var i=0;i<8;i++){
		this.sbotSide[i]=document.createElement("IMG");
		this.sbotSide[i].style.height="100%";
		this.sbotSide[i].src=("/sbot_side?num="+i);
	}
	this.sbotFlip=[];
	for(var i=0;i<8;i++){
		this.sbotFlip[i]=document.createElement("IMG");
		this.sbotFlip[i].style.height="100%";
		this.sbotFlip[i].src=("/sbot_flip?num="+i);
	}
	
	this.disbotFront=[];
	for(var i=0;i<7;i++){
		this.disbotFront[i]=document.createElement("IMG");
		this.disbotFront[i].style.height="100%";
		this.disbotFront[i].src=("/disbot_front?num="+i);
	}
	this.disbotBack=[];
	for(var i=0;i<7;i++){
		this.disbotBack[i]=document.createElement("IMG");
		this.disbotBack[i].style.height="100%";
		this.disbotBack[i].src=("/disbot_back?num="+i);
	}
	this.disbotSide=[];
	for(var i=0;i<8;i++){
		this.disbotSide[i]=document.createElement("IMG");
		this.disbotSide[i].style.height="100%";
		this.disbotSide[i].src=("/disbot_side?num="+i);
	}
	this.disbotFlip=[];
	for(var i=0;i<8;i++){
		this.disbotFlip[i]=document.createElement("IMG");
		this.disbotFlip[i].style.height="100%";
		this.disbotFlip[i].src=("/disbot_flip?num="+i);
	}
	
	this.zbotFront=[];
	for(var i=0;i<7;i++){
		this.zbotFront[i]=document.createElement("IMG");
		this.zbotFront[i].style.height="100%";
		this.zbotFront[i].src=("/zbot_front?num="+i);
	}
	this.zbotBack=[];
	for(var i=0;i<7;i++){
		this.zbotBack[i]=document.createElement("IMG");
		this.zbotBack[i].style.height="100%";
		this.zbotBack[i].src=("/zbot_back?num="+i);
	}
	this.zbotSide=[];
	for(var i=0;i<8;i++){
		this.zbotSide[i]=document.createElement("IMG");
		this.zbotSide[i].style.height="100%";
		this.zbotSide[i].src=("/zbot_side?num="+i);
	}
	this.zbotFlip=[];
	for(var i=0;i<8;i++){
		this.zbotFlip[i]=document.createElement("IMG");
		this.zbotFlip[i].style.height="100%";
		this.zbotFlip[i].src=("/zbot_flip?num="+i);
	}
	
	this.clyveRight=[];
	for(var i=0;i<8;i++){
		this.clyveRight[i]=document.createElement("IMG");
		this.clyveRight[i].style.height="100%";
		this.clyveRight[i].src=("/clyve_right?num="+i);
	}
	
	this.clyveLeft=[];
	for(var i=0;i<8;i++){
		this.clyveLeft[i]=document.createElement("IMG");
		this.clyveLeft[i].style.height="100%";
		this.clyveLeft[i].src=("/clyve_left?num="+i);
	}
	
	this.mineExplosion=[];
	for(var i=0;i<6;i++){
		this.mineExplosion[i]=document.createElement("IMG");
		this.mineExplosion[i].style.height="100%";
		this.mineExplosion[i].src=("/mineExplosion?num="+i);
	}
	
	this.guntower=document.createElement("IMG");
	this.guntower.style.height="100%";
	this.guntower.src=("/tower?type=guntower");
	
	this.mine=document.createElement("IMG");
	this.mine.style.height="100%";
	this.mine.src=("/tower?type=mine");
	
	this.flametower=document.createElement("IMG");
	this.flametower.style.height="100%";
	this.flametower.src=("/tower?type=flametower");
	
}

//takes values as % terminated string
function rangeFinder(x1,y1,x2,y2){
		if(x2&&y2){
			var tempX2 = x2.split("%");
			var tempY2 = y2.split("%");
			
			triX = Math.abs(x1 - tempX2[0]);
			triY = Math.abs(y1 - tempY2[0]);
			
			return (Math.sqrt( Math.pow(triX,2) + Math.pow(triY,2) ) );
		}
		else return 100;
}