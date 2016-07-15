	var moveIncrement=1;
	var leftMove=false,rightMove=false,upMove=false,downMove=false;
	var x=50,y=50;

	//Listens for keys to be pressed and routes to appropriate function on keypress
	document.addEventListener('keypress',function(e){
			var key=e.which||e.keyCode;
			console.log(key);
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
	});

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
	});

	setInterval(function(){
		if(document.getElementById("player")){
			if(x<99 && leftMove==false && rightMove==true)
				x+=moveIncrement;
			else if(x>1 && leftMove==true && rightMove==false)
				x-=moveIncrement;
			if(y<99 && downMove==true && upMove==false){
				y+=moveIncrement;
			}
			else if(y>1 && downMove==false && upMove==true){
				console.log("up");
				y-=moveIncrement;
			}
			document.getElementById("player").style.left=x+"%";
			document.getElementById("player").style.top=y+"%";
		}
	},30);