var isShooting;
var startX;
var startY;
var endX;
var endY;
var previousAngle;
var shotBalls;

function startShooting(X, Y){
	isShooting = true;
	startX = X;
	startY = Y;
}

function endShooting(X, Y){
	isShooting = false;
	previousAngle = angle; //Keep track of previous angle to keep arrow stationary if shot is invalid
	//If pull is from right to left
	if(startX > endX){
		angle = 180-(Math.atan((endY-startY)/(startX-endX))*(180/Math.PI));
	}
	//If pull is from left to right
	else if(startX < endX){
		angle = Math.atan((endY-startY)/(endX-startX))*(180/Math.PI);
	}
	//Pull is straight
	else{
		angle = 90;	
	}
}

function shotValid(){
	if (startY > endY){
		angle = previousAngle;
		return false;	
	}
	else if(angle >= 0 && angle <= 180){
		return true;	
	}	
	else{
		angle = previousAngle;
		return false
	}
}

function shootBall(){
	redrawInterface();
	var num = 0;
	var newBall = new ball();
	newBall.x = width/2;
	newBall.y = height;
	newBall.radius = 10;
	newBall.dx = Math.tan((angle-90)*(Math.PI/180));
	newBall.dy = -1;
	newBall.col = "black";
	shotBalls.push(newBall);
}