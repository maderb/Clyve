var authenticated = false;

$(document).ready(function(){
	
	$("#login").click(function(req){
		$.post({
			url:'/clyve',
			contentType:"application/json",
			dataType:"json",
			data:JSON.stringify({username:$("#username").val(),userpw:$("#userpw").val()}),
			success:function(data,status){;
				if(data.status!=1){
					document.getElementById("status_box").innerHTML="Failed to successfully authenticate user.";
				}
				else{
					authenticated=true;
					document.body.innerHTML = '<div ID="home"></div>';
				}
			}
		});
	});
});