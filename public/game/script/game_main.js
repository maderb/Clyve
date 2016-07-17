$(document).ready(function(){
	//horizontal speed and adjusted vertical speed according to aspect ratio.
	var moveXIncrement=.4;
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
	function straightRobot(){
		this.name="straightRobot";
	}
	
	//constructor for disarmRobot class
	function disarmRobot(){
		this.name="disarmRobot";
	}
	
	//constructor for zigRobot class
	function zigRobot(){
		this.name="zigRobot";
	}
	
	//Function for creating robots. Takes string containing type to be created and returns status=0 if failed.
	function createRobot(typeName){
		switch(typeName){
			case "straightRobot":
				robots.straightRobots+=new straightRobot();
				return true;
			case "disarmRobot":
				robots.disarmRobots+=new disarmRobot();
				return true;
			case "zigRobot":
				robots.zigRobots+=zigRobot;
				return true;
		}
		return false;
	}
	
	//DEFINE TOWERS
	var towers={
		mines:[],
		gunTowers:[],
		flameTowers:[]
	}
	
	//Hub function for creation of new towers. Takes argument of string type and returns status 1 if valid input.
	function createTower(typeName){
		switch(typeName){
			case "mine":
				
				return true;
			case "gunTower":
				
				return true;
			case "flameTower":
	
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
					createRobot("straightRobot");
					break;
				case 50:
					createRobot("disarmRobot");
					break;
				case 51:
					createRobot("zigRobot");
					break;
				case 52:
					break;
				case 53:
					break;
				case 54:
					break;
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
		}
	});
	
	//Updates player object position
	function playerMove(){
		if(document.getElementById("player")){
			if(x<99 && leftMove==false && rightMove==true)
				x+=moveXIncrement;
			else if(x>1 && leftMove==true && rightMove==false)
				x-=moveXIncrement;
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