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
			gs.robotMove();
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
				if(leftMove==false && rightMove==true){
					gs.p.moveR(moveXIncrement);
				}
				if(leftMove==true && rightMove==false){
					gs.p.moveL(moveXIncrement);
				}
				if(downMove==true && upMove==false){
					gs.p.moveD(moveYIncrement);
				}
				if(downMove==false && upMove==true){
					gs.p.moveU(moveYIncrement);
				}
				document.getElementById("player").style.left=gs.p.loc[0]+"%";
				document.getElementById("player").style.top=gs.p.loc[1]+"%";
			}
		}
	});
});