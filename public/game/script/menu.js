var authenticated = false;
var username="";
var password="";

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
					$("#game_panel").load("/playClyve");
				}
			}
		});
	});
});