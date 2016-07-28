$.getScript("/objects", function(){
	

$(document).ready(function(){
		//horizontal speed and adjusted vertical speed according to aspect ratio.
		var moveXIncrement=.6;
		var moveYIncrement=moveXIncrement*($("#game_panel").width() / $("#game_panel").height());
		
		//tracks current status of directional buttons.
		var leftMove=false,rightMove=false,upMove=false,downMove=false;
		
		//create instance of Clyve from clyveObjectsRef.js. type="player"
		var gs = new Gamestate("gamestate");

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
					if(!gs.genTower("mineTower"))
						console.log("Insufficient Scraps");
					document.getElementById("hot1").style.backgroundColor="black";
					break;
				case 50:
					if(!gs.genTower("gunTower"))
						console.log("Insufficient Scraps");
					document.getElementById("hot2").style.backgroundColor="black";
					break;
				case 51:
					if(!gs.genTower("flameTower"))
						console.log("Insufficient Scraps");
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
				if(gs.p.loc[0]<99 && leftMove==false && rightMove==true){
					gs.p.loc[0]+=moveXIncrement;
					console.log(gs.p.loc[0]);
				}
				else if(gs.p.loc[0]>1 && leftMove==true && rightMove==false){
					gs.p.loc[0]-=moveXIncrement;
					console.log(gs.p.loc[0]);
				}
				if(gs.p.loc[1]<94 && downMove==true && upMove==false){
					gs.p.loc[1]+=moveYIncrement;
					console.log(gs.p.loc[1]);
				}
				else if(gs.p.loc[1]>6 && downMove==false && upMove==true){
					gs.p.loc[1]-=moveYIncrement;
					console.log(gs.p.loc[1]);
				}
				document.getElementById("player").style.left=gs.p.loc[0]+"%";
				document.getElementById("player").style.top=gs.p.loc[1]+"%";
			}
		}
		
		//Move all robots according to specified AI functions.
		function robotMove(){
			for(var i=0;i<gs.robots.sbots.length;i++){
				//add movement algorithm here for straightRobots
			}
			for(var i=0;i<gs.robots.disbots.length;i++){
				//add movement information here for disarmRobots
			}
			for(var i=0;i<gs.robots.zbots.length;i++){
				//add movement information here for zigRobots
			}
		}
	});
});