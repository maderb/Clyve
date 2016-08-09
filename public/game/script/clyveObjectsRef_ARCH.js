//Author: Benjamin Frishman & 
//Description: Class objects for clyve
//Date: 7-6-16

function Clyve (type) {
	this.type = type;
	this.loc = [50, 60];
	this.scrapCnt = 4; //starting amount of scraps, may change as game gets balanced.
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
	
	//console.log("X: " + x + " Y: " + y);
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
	this.towerName = "zbot" + gs.totalRobots[0]++;
	this.zigCnt=16;
	this.section=0;
	Robot.call(this,x,y,gs);
}

zbot.prototype=Object.create(Robot.prototype);

zbot.prototype.findSec = function() {
	var x = this.loc[0];
	var y = this.loc[1];
	var tempX = Number(x.slice(0, x.length - 1));
	var tempY = Number(y.slice(0, y.length - 1));	
	if(tempX > 50){//right half
		if(tempY<tempX){//upper bound right quarter
			if(tempY>(100-tempX))//lower bound right quarter
				this.section = 1;
			else
				this.section = 0;
		}
		else
			this.section = 0;
	}
	else{
		if(tempY<(100-tempX)){//upper bound
			if(tempY>tempX)//lower bound
				this.section = 1;
			else
				this.section = 0;
		}
		else 
			this.section = 0;
	}
};

zbot.prototype.move = function(gs){
	this.frameUpdate(gs);
	
	var x = this.loc[0];
	var y = this.loc[1];
	
	//console.log("X: " + x + " Y: " + y);
	var tempX = Number(x.slice(0, x.length - 1));
	var tempY = Number(y.slice(0, y.length - 1));
	
	var quadrant=this.quadrantFinder(tempX,tempY);
	//var pie=this.pieFinder(tempX,tempY);
	var moveRatio;
	var moveX=0;
	var moveY=0;
	
	var rise = tempY - 50;
	var run = tempX - 50;
	
	if(this.zigCnt==16){
		this.findSec();
		//console.log("setup pie: " + this.section + "\n");
		this.zigCnt=0;
	}
	else if(this.zigCnt<2){//normal move
		//console.log("01\n");
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
	}
	else if(this.zigCnt>1 && this.zigCnt<5){//move one directional based off of pie slice
		//console.log("23\n");
		if(this.section==0){
			moveX = .5;
		}
		else if(this.section==1){
			moveY = .5;
		}
		else{return 1;}
	}
	else if(this.zigCnt>4 && this.zigCnt<8){//normal move
		//console.log("45\n");
		
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
	}
	else if(this.zigCnt>7 && this.zigCnt<11){//move other directional
		//console.log("67\n");
		if(this.section==0){
			moveX = -.5;
		}
		else if(this.section==1){
			moveY = -.5;
		}
		else{return 1;}
	}		
	this.zigCnt++;
	if(this.zigCnt>11){this.zigCnt=0;}
	
	x = (tempX + moveX) + "%";
	y = (tempY + moveY) + "%";
	this.loc = [x, y];
	
	document.getElementById(this.towerName).style.left = x;
	document.getElementById(this.towerName).style.top = y;
	return 0;
};

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
}

//straight bot: charges straight in
function sbot (x, y, gs) {
	this.speed=.2;
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
}

//disarm bot: charges in straight and disarms the first tower it comes into contact with (dies?)
function disbot (x, y, gs) {
	this.speed=.1;
	this.armor=1;
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
}

//Define tower constructors and creator (function kept this mostly the same for compatability with your ui but maybe should split it up a bit...)
//updated to pass in x,y though not 100% sure that is correct yet... temp.
function mineTower(x, y, gs){
	this.towerName="mineTower"+gs.totalTowers[0]++;
	this.xPos=x;
	this.yPos=y;
	
	//likely have to sepperate these parts...107-119 as well as the other towers
	console.log("create " +this.towerName );
	var tower = document.createElement("DIV");
	tower.id = this.towerName;
	document.getElementById("game_panel").appendChild(tower);
	tower.style.position = "absolute";
	tower.style.height = "2em";
	tower.style.width = "1em";
	tower.style.left = x+"%";
	tower.style.top = y+"%";
	tower.style.transform = "translate(-50%,-50%)"
	
	//create as color block to show place
	tower.style.backgroundColor = "green";
}
function gunTower(x, y, gs){
	this.towerName="gunTower"+gs.totalTowers[1]++;
	this.xPos=x;
	this.yPos=y;
	
	console.log("create "+this.towerName);
	var tower = document.createElement("DIV");
	tower.id=this.towerName;
	document.getElementById("game_panel").appendChild(tower);
	tower.style.position = "absolute";
	tower.style.height = "2em";
	tower.style.width = "1em";
	tower.style.left = x+"%";
	tower.style.top = y+"%";
	tower.style.transform = "translate(-50%,-50%)"
	tower.style.backgroundColor = "blue";
}
function flameTower(x, y, gs){
	this.towerName="flameTower"+gs.totalTowers[2]++;
	this.xPos=x;
	this.yPos=y;
	
	console.log("create "+this.towerName);
	var tower = document.createElement("DIV");
	tower.id=this.towerName;
	document.getElementById("game_panel").appendChild(tower);
	tower.style.position = "absolute";
	tower.style.height = "2em";
	tower.style.width = "1em";
	tower.style.left = x+"%";
	tower.style.top = y+"%";
	tower.style.transform = "translate(-50%,-50%)"
	tower.style.backgroundColor = "purple";
}

//the gamestate with all objects combined
//uses: gamestate.p.moveR() to move right etc...
function Gamestate (type) {
	this.user;
	this.pw;
	this.type = type;
	this.home = 3; //This is the home's hitpoints.
	this.difficulty = .01; //higher=more difficult
	this.p = new Clyve("player");
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
				if(this.p.scrapCnt > 0){//if clyve has the scraps
					this.towers.mineTowers[this.towers.mineTowers.length] = new mineTower(posx, posy, this);
					this.p.scrapCnt -= 1; //arbitrary value, scrap consumption will change
					return true;
				}
				break;
			case "gunTower":
				if(this.p.scrapCnt > 0){//if clyve has the scraps
					this.towers.gunTowers[this.towers.mineTowers.length] = new gunTower(posx, posy, this);
					this.p.scrapCnt -= 1; //arbitrary value, scrap consumption will change
					return true;
				}
				break;
			case "flameTower":
				if(this.p.scrapCnt > 0){//if clyve has the scraps
					this.towers.flameTowers[this.towers.mineTowers.length] = new flameTower(posx, posy, this);
					this.p.scrapCnt -= 1; //arbitrary value, scrap consumption will change
					return true;
				}
		}
		return false;
};

Gamestate.prototype.deleteBot = function(i, bot) {
	if(bot==0){
		//console.log("killed a sbot\n");
		//destroy the image too
		if(this.robots.sbots.splice(i,1)){return 0;}

	}
	else if(bot==1){	
		//console.log("killed a zbot\n");
		//destroy the image too	
		if(this.robots.zbots.splice(i,1)){return 0;}
	
	}	
	else if(bot==2){
		//console.log("killed a disbot\n");
		//destroy the image too
		if(this.robots.disbots.splice(i,1)){return 0;}
	}
	else{
		return 1; 
	}
}

Gamestate.prototype.deleteMine = function(i) {
	console.log("killed a mine\n");
	//destroy image here...
	if(this.towers.mineTowers.splice(i,1)){return 0;}	
	/*saved for if we implement more mines...
	if(bot==0){
		//console.log("killed a sbot\n");
		//destroy the image too
		if(this.robots.sbots.splice(i,1)){return 0;}

	}
	else if(bot==1){	
		//console.log("killed a zbot\n");
		//destroy the image too	
		if(this.robots.zbots.splice(i,1)){return 0;}
	
	}	
	else if(bot==2){
		//console.log("killed a disbot\n");
		//destroy the image too
		if(this.robots.disbots.splice(i,1)){return 0;}
	}*/
	else{
		return 1; 
	}
}

//gamestate function to check for mine/bot proximity detonate bombs break bots
//currently only testing for minetower proximity...
Gamestate.prototype.prox = function() {
	var i;
	var j;
	var x;
	var y;	
	var z;
	var tempX;
	var tempY;
	var mineX;
	var mineY;
	//var explode = [];//queue of ints for mines to explode
	for(i=0;i<this.robots.sbots.length;i++){//killin sbots
		x = this.robots.sbots[i].loc[0];
		y = this.robots.sbots[i].loc[1];
		tempX = Number(x.slice(0, x.length - 1));
		tempY = Number(y.slice(0, y.length - 1));
		//console.log("X: " + tempX + " Y: " + tempY + "\n");		
		if(tempX < 52 && tempX > 48 && tempY < 52 && tempY > 48){
			console.log("sbot reached home\n");//reached home
			this.deleteBot(i, 0);
			this.home = this.home - 1;
		}
		for(j=0;j<this.towers.mineTowers.length;j++){
			mineX = this.towers.mineTowers[j].xPos;
			mineY = this.towers.mineTowers[j].yPos
			//console.log("x: " + mineX + " y: " + mineY);
			//console.log("tempx: " + tempX + " tempy: " + tempY);
			if(tempX < (mineX+5) && tempX > (mineX-5) && tempY < (mineY+5) && tempY > (mineY-5)){
				if(!(this.deleteBot(i, 0))){this.p.scrapCnt = (this.p.scrapCnt + 1);}
				console.log("dedsbot by mine. Scrapcount: " + this.p.scrapCnt);//reached mine
				this.deleteMine(j);
				//var explode[this.towers.mineTowers.length]=j//add mine to boom queue in case it double kills
			}
		}
		//for(z=0;z<this.towers.mineTowers.length;z++){
			//tSPLICE this.towers.mineTowers[.explode[z]];
		//}
	}		
	for(i=0;i<this.robots.zbots.length;i++){//killin zbots
		x = this.robots.zbots[i].loc[0];
		y = this.robots.zbots[i].loc[1];
		var tempX = Number(x.slice(0, x.length - 1));
		var tempY = Number(y.slice(0, y.length - 1));
		//console.log("X: " + tempX + " Y: " + tempY + "\n");		
		if(tempX < 52 && tempX > 48 && tempY < 52 && tempY > 48){
			console.log("zbot reached home\n");//reached home
			this.deleteBot(i, 1);
			this.home = this.home - 1;
		}
		for(j=0;j<this.towers.mineTowers.length;j++){
			mineX = this.towers.mineTowers[j].xPos;
			mineY = this.towers.mineTowers[j].yPos
			//console.log("x: " + mineX + " y: " + mineY);
			//console.log("tempx: " + tempX + " tempy: " + tempY);
			if(tempX < (mineX+5) && tempX > (mineX-5) && tempY < (mineY+5) && tempY > (mineY-5)){
				if(!(this.deleteBot(i, 1))){this.p.scrapCnt = (this.p.scrapCnt + 1);}
				console.log("dedsbot by mine. Scrapcount: " + this.p.scrapCnt);//reached mine
				this.deleteMine(j);
				//var explode[this.towers.mineTowers.length]=j//add mine to boom queue in case it double kills
			}
		}
	}
	for(i=0;i<this.robots.disbots.length;i++){
		x = this.robots.disbots[i].loc[0];
		y = this.robots.disbots[i].loc[1];
		var tempX = Number(x.slice(0, x.length - 1));
		var tempY = Number(y.slice(0, y.length - 1));
		//console.log("X: " + tempX + " Y: " + tempY + "\n");		
		if(tempX < 52 && tempX > 48 && tempY < 52 && tempY > 48){
			console.log("disbot reached home\n");//reached home
			this.deleteBot(i, 2);
			this.home = this.home - 1;
		}
		for(j=0;j<this.towers.mineTowers.length;j++){
			mineX = this.towers.mineTowers[j].xPos;
			mineY = this.towers.mineTowers[j].yPos
			//console.log("x: " + mineX + " y: " + mineY);
			//console.log("tempx: " + tempX + " tempy: " + tempY);
			if(tempX < (mineX+5) && tempX > (mineX-5) && tempY < (mineY+5) && tempY > (mineY-5)){
				if(this.robots.disbots[i].armor == 1){
					this.robots.disbots[i].armor = 0;
					this.deleteMine(j);
					//var explode[this.towers.mineTowers.length]=j//add mine to boom queue in case it double kills
				}
				else if(this.robots.disbots[i].armor == 0){
					if(!(this.deleteBot(i, 2))){this.p.scrapCnt = (this.p.scrapCnt + 1);}
					console.log("dedsbot by mine. Scrapcount: " + this.p.scrapCnt);//reached mine
					this.deleteMine(j);
					//var explode[this.towers.mineTowers.length]=j//add mine to boom queue in case it double kills
				}
			}
		}
	}
};

//gamestate function to move bots
Gamestate.prototype.robotMove = function() {
	for(var i=0;i<this.robots.sbots.length;i++){
		if(this.robots.sbots[i].move(this)){
			document.getElementById("game_panel").removeChild(this.robots.sbots[i].bot);
			while((i+1) < this.robots.sbots.length){this.robots.sbots[i]=this.robots.sbots[++i];}
			this.robots.sbots.length--;
		}
	}
	for(var i=0;i<this.robots.disbots.length;i++){
		if(this.robots.disbots[i].move(this)){
			document.getElementById("game_panel").removeChild(this.robots.disbots[i].bot);
			while((i+1) < this.robots.disbots.length){this.robots.disbots[i]=this.robots.disbots[++i];}
			this.robots.disbots.length--;
		}
	}
	for(var i=0;i<this.robots.zbots.length;i++){
		if(this.robots.zbots[i].move(this)){
			document.getElementById("game_panel").removeChild(this.robots.zbots[i].bot);
			while((i+1) < this.robots.zbots.length){this.robots.zbots[i]=this.robots.zbots[++i];}
			this.robots.zbots.length--;
		}
	}
	/******************************NEED TO RELOCATE**********************************************/
	this.prox();
	if(this.isLost()){console.log("Game Over Man!\n");}
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
}