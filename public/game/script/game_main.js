$(document).ready(function(){
	//horizontal speed and adjusted vertical speed according to aspect ratio.
	var moveXIncrement=.6;
	var moveYIncrement=moveXIncrement*($("#game_panel").width() / $("#game_panel").height());
	
	//tracks current status of directional buttons.
	var leftMove=false,rightMove=false,upMove=false,downMove=false;
	
	//tracks player's x and y position.
	var x=50,y=50;
	
	//DEFINE ROBOT LIST
	var robots={
		straightRobots:[],
		disarmRobots:[],
		zigRobots:[]
	}
	
	//Constructor for straightRobot class
	function straightRobot(xPosition,yPosition){
		this.name="straightRobot";
	}
	
	//constructor for disarmRobot class
	function disarmRobot(xPosition,yPosition){
		this.name="disarmRobot";
	}
	
	//constructor for zigRobot class
	function zigRobot(xPosition,yPosition){
		this.name="zigRobot";
	}
	
	//Function for creating robots. Takes string containing type to be created and returns status=0 if failed.
	function createRobot(robotName,xPosition,yPosition){
		switch(robotName){
			case "straightRobot":
				robots.straightRobots+=new straightRobot(xPosition,yPosition);
				return true;
			case "disarmRobot":
				robots.disarmRobots+=new disarmRobot(xPosition,yPosition);
				return true;
			case "zigRobot":
				robots.zigRobots+= new zigRobot(xPosition,yPosition);
				return true;
		}
		return false;
	}
	
	//DEFINE TOWERS
	var towers={
		mineTowers:[],
		gunTowers:[],
		flameTowers:[]
	}
		
	//Define tower constructors and creator function
	function mineTower(){
		this.towerName="mineTower";
		this.xPos=x;
		this.yPos=y;
		
		console.log("create mineTower: "+towers.mineTowers.length);
		var tower = document.createElement("DIV");
		tower.id=this.towerName + towers.mineTowers.length;
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
	function gunTower(){
		this.towerName="gunTower";
		this.xPos=x;
		this.yPos=y;
		
		console.log("create gunTower: "+towers.gunTowers.length);
		var tower = document.createElement("DIV");
		tower.id=this.towerName + towers.gunTowers.length;
		document.getElementById("game_panel").appendChild(tower);
		tower.style.position = "absolute";
		tower.style.height = "2em";
		tower.style.width = "1em";
		tower.style.left = x+"%";
		tower.style.top = y+"%";
		tower.style.transform = "translate(-50%,-50%)"
		tower.style.backgroundColor = "blue";
	}
	function flameTower(){
		this.towerName="flameTower";
		this.xPos=x;
		this.yPos=y;
		
		console.log("create flameTower: "+towers.flameTowers.length);
		var tower = document.createElement("DIV");
		tower.id=this.towerName + towers.flameTowers.length;
		document.getElementById("game_panel").appendChild(tower);
		tower.style.position = "absolute";
		tower.style.height = "2em";
		tower.style.width = "1em";
		tower.style.left = x+"%";
		tower.style.top = y+"%";
		tower.style.transform = "translate(-50%,-50%)"
		tower.style.backgroundColor = "purple";
	}
	
	//Hub function for creation of new towers. Takes argument of string type and returns status 1 if valid input.
	function createTower(typeName){
		switch(typeName){
			case "mineTower":
				towers.mineTowers += new mineTower();
				return true;
			case "gunTower":
				towers.gunTowers += new gunTower();
				return true;
			case "flameTower":
				towers.gunTowers += new flameTower();
				return true;
		}
		return false;
	}

	//GAME LOOP: REFRESH RATE 33hz
	setInterval(function(){
		playerMove();
		robotMove();
	},30);
	
	//Listens for keys to be pressed and routes to appropriate function on keypress
	document.addEventListener('keypress',function(e){
		var key=e.which||e.keyCode;
		switch(key){
			case 37:
				leftMove=true;
				break;
			case 39:
				rightMove=true;
				break;
			case 40:
				downMove=true;
				break;
			case 38:
				upMove=true;
				break;
			case 49:
				createTower("mineTower");
				document.getElementById("hot1").style.backgroundColor="black";
				break;
			case 50:
				createTower("gunTower");
				document.getElementById("hot2").style.backgroundColor="black";
				break;
			case 51:
				createTower("flameTower");
				document.getElementById("hot3").style.backgroundColor="black";
		}
	});

	//Set directional indicators back to false if button is lifted.
	document.addEventListener('keyup',function(e){
		var key=e.which||e.keyCode;
		switch(key){
			case 37:
				leftMove=false;
				break;
			case 39:
				rightMove=false;
				break;
			case 40:
				downMove=false;
				break;
			case 38:
				upMove=false;
				break;
			case 49:
				document.getElementById("hot1").style.backgroundColor="white";
				break;
			case 50:
				document.getElementById("hot2").style.backgroundColor="white";
				break;
			case 51:
				document.getElementById("hot3").style.backgroundColor="white";
		}
	});
	
	//Updates player object position
	function playerMove(){
		if(document.getElementById("player")){
			if(x<99 && leftMove==false && rightMove==true){
				x+=moveXIncrement;
			}
			else if(x>1 && leftMove==true && rightMove==false){
				x-=moveXIncrement;
			}
			if(y<94 && downMove==true && upMove==false){
				y+=moveYIncrement;
			}
			else if(y>6 && downMove==false && upMove==true){
				y-=moveYIncrement;
			}
			document.getElementById("player").style.left=x+"%";
			document.getElementById("player").style.top=y+"%";
		}
	}
	
	//Move all robots according to specified AI functions.
	function robotMove(){
		for(var i=0;i<robots.straightRobots.length;i++){
			//add movement algorithm here for straightRobots
		}
		for(var i=0;i<robots.disarmRobots.length;i++){
			//add movement information here for disarmRobots
		}
		for(var i=0;i<robots.zigRobots.length;i++){
			//add movement information here for zigRobots
		}
	}
	
});