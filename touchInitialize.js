//Converts touch location to canvas location
function canvasCoord(x, y) {
	this.x = x - bottomCanvas.offsetLeft;
	this.y = y - bottomCanvas.offsetTop;
	return this;
}

function canvasCoordX(x) {
	this.x = x - bottomCanvas.offsetLeft;
	return this.x;
}

function canvasCoordY(y) {
	this.y = y - bottomCanvas.offsetTop;
	return this.y;
}

function touchInitialize(){	
	document.addEventListener('touchstart', function(event) {
		event.preventDefault();
		var touch = event.touches[0];	
		if((canvasCoordY(touch.pageY) > canvasHeight-100) && (canvasCoordY(touch.pageY) < canvasHeight)){
			startShooting(canvasCoordX(touch.pageX), canvasCoordY(touch.pageY));
		}
	}, false);
	
	document.addEventListener('touchmove',function(event) {
		event.preventDefault();
		var touch = event.touches[0];
  		endX = canvasCoordX(touch.pageX);
  		endY = canvasCoordY(touch.pageY);
	},false);
	
	document.addEventListener('touchend', function(event) {
		event.preventDefault();
		var touch = event.touches[0];
		if(isShooting == true){
			endShooting(endX, endY);
			if(!shotBalls[0] && shotValid()){
				shootBall();
			}
		}
	}, false);
}