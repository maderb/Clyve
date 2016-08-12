var authenticated = false;

$(document).ready(function(){
	
	//Listens for login button to be clicked and clears body to load game if successful.
	//If unsuccessful, outputs error message to status_box element.
	$("#login").click(function(req){
		username=$("#username").val();
		password=$("#userpw").val();
		$.post({
			url:'/clyve',
			contentType:"application/json",
			data:JSON.stringify({userid:username,userpw:password }),
			success:function(data,status){
				if(data.status!=1){
					document.getElementById("status_box").innerHTML="Failed to successfully authenticate user.";
				}else{
					
					$.post({
						url:'/loadFile',
						contentType:"application/json",
						data:JSON.stringify({userid:username,userpw:password }),
						success:function(data,status){
							if(data!="NOLOAD"){
								var fileArray = data.split(":");
								console.log(fileArray);
								if(password === fileArray[0]){
									var i;
									
									$("#save_file").show();
									gs.setDifficulty($("#difficulty_setter").val());
									$("#game_panel").load("/playClyve",function(){								
										
										gs.home=parseInt(fileArray[1]);
										gs.difficultySetting = fileArray[2];
										gs.difficulty = parseFloat(fileArray[3]);
										console.log(gs.difficulty);
										gs.scrapCnt = parseInt(fileArray[4]);
										gs.score = parseInt(fileArray[5]);
										gs.totalRobots[0] = parseInt(fileArray[6]);
										gs.totalRobots[1] = parseInt(fileArray[7]);
										gs.totalRobots[2] = parseInt(fileArray[8]);
										var j;
										for(i=13;fileArray[i]!="DISBOT";i++){
											if(fileArray[i+1] != "DISBOT")
												gs.genBots("sbot",fileArray[i]+"%",fileArray[++i]+"%");
												//gs.robots.sbots[(i-13)/2] = new sbot(fileArray[++i]+"%",fileArray[i]+"%",gs);
										}
										console.log(i++);
										j=i;
										for(i;fileArray[i]!="ZBOT";i++){
											if(fileArray[i+1] != "ZBOT")
												gs.genBots("disbot",fileArray[i]+"%",fileArray[++i]+"%");
	//											gs.robots.disbots[(i-j)/2] = new disbot(fileArray[i++]+"%",fileArray[i+1]+"%",gs);
										}
										console.log(i++);
										j=i;
										for(i;fileArray[i]!="MINETOWER";i++){
											if(fileArray[i+1] != "MINETOWER")
												gs.genBots("zbot",fileArray[i]+"%",fileArray[++i]+"%");
	//											gs.robots.zbots[(i-j)/2] = new zbot(fileArray[i]+"%",fileArray[i++]+"%",gs);
										}
										console.log(i++);
										j=i;
										for(i;fileArray[i]!="GUNTOWER";i++){
											if(fileArray[i+1] != "GUNTOWER"){
												xPos = fileArray[i];
												yPos = fileArray[i+1];
												gs.towers.mineTowers[(i-j)/2] = new mineTower(xPos,yPos,gs);
												i++;
											}
										}
										console.log(i++);
										j=i;
										for(i;fileArray[i]!="FLAMETOWER";i++){
											if(fileArray[i+1] != "FLAMETOWER"){
												xPos = fileArray[i];
												yPos = fileArray[i+1];
												gs.towers.gunTowers[(i-j)/2] = new gunTower(xPos,yPos,gs);
												i++;
											}
										}
										j=i;
										console.log(i++);
										for(i;fileArray[i]!="END";i++){
											if(fileArray[i+1] != "END"){
												xPos = fileArray[i];
												yPos = fileArray[i+1];
												gs.towers.flameTowers[(i-j)/2] = new flameTower(xPos,yPos,gs);
												i++;
											}
										}
									});
								}else{console.log("Invalid Password");}
							}else{
								console.log("Could not open save file.");
								$("#save_file").show();
								gs.setDifficulty($("#difficulty_setter").val());
								$("#game_panel").load("/playClyve");
							}
						}
					});
				}
			}
		});
	});
});