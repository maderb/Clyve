document.addEventListener('keypress',function(e){
	var key=e.which||e.keyCode;
	
	switch(key){
		case 119:
			console.log("UP");
			break;
		case 97:
			console.log("LEFT");
			break;
		case 115:
			console.log("DOWN");
			break;
		case 100:
			console.log("RIGHT");
			break;
	}
	console.log("KEYCODE: "+key);
	
});