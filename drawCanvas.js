var collidedBallIndex;

//Checks if shooter and a bouncing ball have collided.
function isShooterCollision(element, index, array){
	var xVar = Math.abs(element.x-canvasWidth/2);
	var yVar = Math.abs(element.y-canvasHeight);
	collidedBallIndex = index;
	return (xVar < element.radius+100 && yVar < element.radius+100);
}		
		

function draw(){

	topCtx.clearRect(0, 0, canvasWidth, canvasHeight);

	//Animates the bouncing balls.
	for(var i = 0; i < balls.length ; i++){
		var ball = balls[i];
		topCtx.strokeStyle=ball.col;
		topCtx.fillStyle=ball.col;
		topCtx.beginPath();
		
		
	//Checks for collision with shooter
	if(balls.some(isShooterCollision)){
		balls[collidedBallIndex].dx *= -1;
		balls[collidedBallIndex].dy *= -1;		
	}		
		//Checks for collision with edges
		if(ball.x<=ball.radius || ball.x >= (width-ball.radius)){
			ball.dx *= -1;
		}
		
		if(ball.y<=ball.radius || ball.y >= (height-ball.radius)){
			ball.dy *= -1;
		}
		
		//Moves the ball
		ball.x += ball.dx;
		ball.y += ball.dy;
		
		//topCtx.drawImage(image, ball.x, ball.y);
		
		//Draws ball on canvas
		topCtx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
		topCtx.globalAlpha = 0.5;
		topCtx.fill();
		topCtx.globalAlpha = 1.0;
		topCtx.stroke();
		topCtx.fillStyle = "black";
		topCtx.textBaseline = "middle";
		topCtx.textAlign = "center";
		topCtx.font = "bold 12px arial";
		topCtx.fillText(ball.letter, ball.x, ball.y);
	}
}