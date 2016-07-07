document.addEventListener('keypress',function(e){
	if(authenticated==true){
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
			case 49:
				console.log("ONE");
				break;
			case 50:
				console.log("TWO");
				break;
			case 51:
				console.log("THREE");
				break;
			case 52:
				console.log("FOUR");
				break;
			case 53:
				console.log("FIVE");
				break;
			case 54:
				console.log("SIX");
		}
	}
});