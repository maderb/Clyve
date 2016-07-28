//Author: Benjamin Frishman & 
//Description: Class objects for clyve
//Date: 7-6-16

//Clyve character object, default position center of first row
//****************************************************************************
function Clyve (type) {
	this.type = type;
	this.loc = [50, 50];
	this.scrapCnt = 4; //starting amount of scraps, may change as game gets balanced.
}

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

//Bots
//*******************************************************************************
//zig bot: zig zags
function zbot (x, y) {
	this.name = "zbot";
	this.loc = [x, y];
	this.movNum = 0; //incremented to determine how the bot moves.
}

//zbot move function moves in a boxy s shape. needs refactoring for smoother moves
zbot.prototype.move = function() {
	var x = this.loc[0];
	var y = this.loc[1];
	if(this.movNum == 0 || this.movNum == 7 || (this.movNum > 2 && this.movNum < 5)){//move up
		this.loc = [x, y-1];//fix ratio
	}
	else if (this.movNum > 0 && this.movNum < 3){//move left
		this.loc = [x-1, y];//fix ratio
	}
	else if (this.movNum > 4 && this.movNum < 7){//move right
		this.loc = [x+1, y];//fix ratio
	}
	this.movNum += 1;
	if(this.movNum > 7) this.movNum = 0; //reset move counter
};
//straight bot: charges straight in
function sbot (x, y) {
	this.name = "sbot";
	this.loc = [x, y];
}

//sbot moves along a straight path
sbot.prototype.move = function() {
	var x = this.loc[0];
	var y = this.loc[1];
	//discuss implementation for house. Do we want it only in center, if so, bots need to move inwards as they get closer...
	this.loc = [x, y-1];//fix ratio
};

//disarm bot: charges in straight and disarms the first tower it comes into contact with (dies?)
function disbot (x, y) {
	this.name = "disbot";
	this.loc = [x, y];
}

//disbot moves along a straight path 
disbot.prototype.move = function() {
	var x = this.loc[0];
	var y = this.loc[1];
	//discuss implementation for house/bots. Do we want it only in center, if so, bots need to move inwards as they get closer...
	this.loc = [x, y-1];//fix ratio
};

//Define tower constructors and creator (function kept this mostly the same for compatability with your ui but maybe should split it up a bit...)
//updated to pass in x,y though not 100% sure that is correct yet... temp.
function mineTower(x, y, gs){
	this.towerName="mineTower"+gs.towers.mineTowers.length;
	this.xPos=x;
	this.yPos=y;
	
	//likely have to sepperate these parts...107-119 as well as the other towers
	console.log("create mineTower"+gs.towers.mineTowers.length);
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
	this.towerName="gunTower"+gs.towers.gunTowers.length;
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
	this.towerName="flameTower"+gs.towers.flameTowers.length;
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
	this.type = type;
	this.home = 3; //This is the home's hitpoints. 
	this.p = new Clyve("player");
	this.robots={
		sbots:[],
		disbots:[],
		zbots:[]
	}
	this.towers={
		mineTowers:[],
		gunTowers:[],
		flameTowers:[]
	}	
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
			robots.ssbots+=new sbot(posx, posy);
			return true;
		case "disbot":
			robots.disbots+=new disbot(posx, posy);
			return true;
		case "zbot":
			robots.zbot+= new zbot(posx, posy);
			return true;
	}
	return false;
};

//gamestate function to create robots.
//updated to pass in x, y
Gamestate.prototype.genTower = function(typeName) {
	if(this.p.scrapCnt > 0){//if clyve has the scraps
		var posx = this.p.loc[0];
		var posy = this.p.loc[1];		
		switch(typeName){
			case "mineTower":
				this.towers.mineTowers += new mineTower(posx, posy, this);
				return true;
			case "gunTower":
				this.towers.gunTowers += new gunTower(posx, posy, this);
				return true;
			case "flameTower":
				this.towers.flameTowers += new flameTower(posx, posy, this);
				return true;
		}
		return false;
	}
};

//gamestate function to move bots
Gamestate.prototype.robotMove = function() {
	for(var i=0;i<this.robots.sbots.length;i++){
		this.robots.sbots[i].move();
	}
	for(var i=0;i<this.robots.disbots.length;i++){
		this.robots.disbots[i].move();		
	}
	for(var i=0;i<this.robots.zbots.length;i++){
		this.robots.zbots[i].move();
	}
};

//gamestate function setting timer for generating and moving bots
Gamestate.prototype.gobot = function() {
	//set a timer to...
		//every 15th(balance stuff here...)time... random number 1-6 makes straight bot, 7-9 makes zig bots, 10-11 makes disarm bots
			//timing is variable to increase difficulty? maybe sepperate to make more differentiation between difficulty levels...
		//move bots 
};

//gamestate function to check for mine/bot proximity
//currently only testing for minetower proximity...
Gamestate.prototype.gobot = function() {
	for(var i=0;i<this.robots.disbots.length;i++){
		for(var j=0;j<this.towers.mineTowers.length;j++){//adjust for proximity not exact location...
			if(this.robots.disbots[i].loc[0] == this.towers.mineTowers[j].xPos && this.robots.disbots[i].loc[1] == this.towers.mineTowers[j].yPos){
				//delete the bot 
				
				//gain scraps
				this.p.scrapCnt += 1;
			}
		}
	}
	for(var i=0;i<this.robots.disbots.length;i++){
		for(var j=0;j<this.towers.mineTowers.length;j++){
			//repeat above
		}
	}
	for(var i=0;i<this.robots.disbots.length;i++){
		for(var j=0;j<this.towers.mineTowers.length;j++){
			//repeat above
		}
	}
};
