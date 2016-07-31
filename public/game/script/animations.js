//robots and towers breaking explosion and building cloud currently lay on top, Bradley had wanted to just swap out the images. something to look into later
function explosion(x,y) {
	var name = "explosion";
	var exp = document.createElement("DIV");
	exp.id = this.name;
	document.getElementById("game_panel").appendChild(exp);
	exp.style.position = "absolute";
	exp.style.height = 0;
	exp.style.width = 0;
	exp.style.left = x;//may need to move this to be centered.
	exp.style.top = y;
	exp.style.transform = "translate(-50%,-50%)"
	
	//create as color block to show place this is where we'll sub in the actual image when we have one...
	exp.style.backgroundColor = "grey";
}

//explosion size change function
explosion.prototype.boom = function() {
	var curExpWidth = 0;
	var curExpHeight = 0;
	var updateTime = 200;
	curExpHeight += 1;//fix this rate
	curExpWidth += 1;//fix this rate
	if (curExpHeight >= maxExpHeight) {//delete the explosion instead probably maybe make it smaller first
		curExpHeight = 0;
		curExpWidth = 0;
	} else {
		setTimeout(explode, 10);
	}
}	

//clyve squatting when building or something...
Clyve.prototype.squat = function() {
	var curClvHeight = 1;//might need to change to look better
	var stdClvHeight = "2em";//mmight change once we have our avatar picked
	curClvHeight -= 1;
	if (curClvHeight <= (stdClvHeight/2)) {
		curClvHeight = stdClvHeight;
	} else {
		setTimeout(squat, 10);
	}
}

//creates a dust cloud around the coordinates where something is being created.
function dust(x,y) {
	var name = "dust";
	var d = document.createElement("DIV");
	d.id = this.name;
	document.getElementById("game_panel").appendChild(d);
	d.style.position = "absolute";
	d.style.height = 0;
	d.style.width = 0;
	d.style.left = x;//may need to move this to be centered.
	d.style.top = y;
	d.style.transform = "translate(-50%,-50%)"
	
	//create as color block to show place this is where we'll sub in the actual image when we have one...
	d.style.backgroundColor = "grey";
}

function build() {
	var curBldWidth = 0;
	var curBldHeight = 0;
	var updateTime = 200;
	curBldHeight += 1;
	curBldWidth += 1;
	if (curBldHeight >= maxBldHeight) {
		curBldHeight = 0;
		curBldWidth = 0;
	} else {
		setTimeout(build, 10);
	}
}

