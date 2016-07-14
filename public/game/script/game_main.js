var moveIncrement=.6;
var leftMove=false,rightMove=false,upMove=false,downMove=false;
var x=50,y=50;

setInterval('animateMove()',30);

//Listens for keys to be pressed and routes to appropriate function on keypress
document.addEventListener('keypress',function(e){
	if(authenticated==true){
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

document.addEventListener('keyup',function(e){
	if(authenticated==true){
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

function animateMove(){
	if(x<100 && leftMove==false && rightMove==true)
		x+=moveIncrement;
	else if(x>0 && leftMove==true && rightMove==false)
		x-=moveIncrement;
	if(y<100 && downMove==true && upMove==false){
		y+=moveIncrement;
	}
	else if(y>0 && downMove==false && upMove==true){
		y-=moveIncrement;
	}
	document.getElementById("player").style.left=x+"%";
	document.getElementById("player").style.top=y+"%";
}