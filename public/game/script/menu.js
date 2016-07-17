var authenticated = false;

$(document).ready(function(){
	
	
	
	//Listens for login button to be clicked and clears body to load game if successful.
	//If unsuccessful, outputs error message to status_box element.
	$("#login").click(function(req){
		$.post({
			url:'/clyve',
			contentType:"application/json",
			data:JSON.stringify({username:$("#username").val(),userpw:$("#userpw").val()}),
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