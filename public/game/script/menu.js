$(document).ready(function(){
	$("#login").click(function(){
		var req = new XMLHttpRequest();
		req.open("POST","/clyve",true);
		req.setRequestHeader("Content-type","application/json;charset=UTF-8");
		req.send(JSON.stringify({"username":$("#username").val(),"userpw":$("#userpw").val()}));
	});
});