var username="";
var password="";

var gs=null;

$.getScript("/menu", function(){
$.getScript("/objects", function(){

	$(document).ready(function(){
			//horizontal speed and adjusted vertical speed according to aspect ratio.
			var moveXIncrement=.6;
			var moveYIncrement=moveXIncrement*($("#game_panel").width() / $("#game_panel").height());
			
			//create instance of Clyve from clyveObjectsRef.js. type="player"
			gs = new Gamestate("gamestate");

			//GAME LOOP: REFRESH RATE 33hz
			setInterval(function(){
				if(gs.home <= 0){
					var gameOver = document.createElement("DIV");
					gameOver.style.position="absolute";
					gameOver.style.top="50%";
					gameOver.style.left="50%";
					gameOver.style.transform="translate(-50%,-50%)";
					gameOver.style.backgroundColor="black";
					gameOver.style.color="white";
					gameOver.style.textAlign="center";
					gameOver.innerHTML='<h1>GAME OVER!</h1><h3>Score: '+ gs.score +'</h3><h3>Difficulty: '+gs.difficultySetting+'</h3>';
					gameOver.style.zIndex="1000"
					document.getElementById("game_panel").appendChild(gameOver);
					gs.home=1000;
				}
				
				if(gs.home<1000){
					if($("#score_track")){
						$("#scrap_track").html(gs.scrapCnt);
						$("#health_track").html(gs.home);
						$("#score_track").html(gs.score);
					}
					
					if(gs.score % 15==0){
						gs.score++;
						gs.difficulty+=gs.difficultyRamping;
					}
						
					playerMove();
					gs.p.playerAnimation(gs);
					gs.robotMove();
					if(document.getElementById("player"))
						robotEngine(gs.difficulty,gs);
					
					for(i=0;gs.towers.mineTowers[i];i++){
						gs.towers.mineTowers[i].attackIncoming(gs,i);
					}
					for(i=0;gs.towers.gunTowers[i];i++){
							gs.towers.gunTowers[i].attackIncoming(gs);					
					}
					for(i=0;gs.towers.flameTowers[i];i++){
							gs.towers.flameTowers[i].attackIncoming(gs);
					}
				}
			},30);	

			//Listens for keys to be pressed and routes to appropriate function on keypress
			document.addEventListener('keydown',function(e){
				var key=e.which||e.keyCode;
				switch(key){
					case 37:
						gs.leftMove=true;
						break;
					case 39:
						gs.rightMove=true;
						break;
					case 40:
						gs.downMove=true;
						break;
					case 38:
						gs.upMove=true;
						break;
					case 49:
						if(!gs.genTower("mineTower",true))
						document.getElementById("hot1").style.backgroundColor="black";
						break;
					case 50:
						if(!gs.genTower("gunTower",true))
						document.getElementById("hot2").style.backgroundColor="black";
						break;
					case 51:
						if(!gs.genTower("flameTower",true
))
						document.getElementById("hot3").style.backgroundColor="black";
				}
			});

			//Set directional indicators back to false if button is lifted.
			document.addEventListener('keyup',function(e){
				var key=e.which||e.keyCode;
				switch(key){
					case 37:
						gs.leftMove=false;
						break;
					case 39:
						gs.rightMove=false;
						break;
					case 40:
						gs.downMove=false;
						break;
					case 38:
						gs.upMove=false;
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
					if(gs.leftMove==false && gs.rightMove==true){
						gs.p.moveR(moveXIncrement);
					}
					if(gs.leftMove==true && gs.rightMove==false){
						gs.p.moveL(moveXIncrement);
					}
					if(gs.downMove==true && gs.upMove==false){
						gs.p.moveD(moveYIncrement);
					}
					if(gs.downMove==false && gs.upMove==true){
						gs.p.moveU(moveYIncrement);
					}
					document.getElementById("player").style.left=gs.p.loc[0]+"%";
					document.getElementById("player").style.top=gs.p.loc[1]+"%";
				}
			}
			
			$("#save_file").click(function(req){
				$.post({
					url:'/saveFile',
					contentType:"application/json",
					data:JSON.stringify({"userid":username,"userpw":password,"gamestate":gs}),
					success:function(data,status){
						if(data.status==1){
							console.log("File saved.");
						}else{
							console.log("Failed to submit save request.");
						}
					}
				});
			});
		});
});
});