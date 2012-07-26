var collidedBallIndex;	

function isCollision(element, index, array){
	var shotBall = shotBalls[shotBalls.length-1];
	var xVar = Math.abs(element.x-shotBall.x);
	var yVar = Math.abs(element.y-shotBall.y);
	collidedBallIndex = index;
	return (xVar < element.radius+shotBall.radius-7 && yVar < element.radius+shotBall.radius-7);
	//return (element.x==shotBall.x||element.y==shotBall.y);
}

function drawInterface(){

	bottomCtx.strokeStyle="black";
	bottomCtx.save();
	bottomCtx.translate(canvasWidth/2, canvasHeight);
	bottomCtx.rotate(Math.PI/180 * angle);

	bottomCtx.fillStyle = "black";
	bottomCtx.beginPath();
	bottomCtx.moveTo(-100,0);
	bottomCtx.lineTo(-86,10);
	bottomCtx.lineTo(-93,0);

	bottomCtx.lineTo(-86,-10);
	bottomCtx.fill();
	bottomCtx.moveTo(-100,0);
	bottomCtx.lineTo(100,0);

	bottomCtx.arc(0, 0, 30, 0, 2*Math.PI, false);
	bottomCtx.stroke();
	bottomCtx.fill();
	bottomCtx.moveTo(100,10);
	bottomCtx.lineTo(100,-10);
	bottomCtx.lineTo(-100,0);
	bottomCtx.fill();

	//Draw outer circle around shooter
	bottomCtx.moveTo(-100,0);
	bottomCtx.lineTo(100,0);
	bottomCtx.arc(0, 0, 100, 0, 2*Math.PI, false);
	bottomCtx.stroke();

	bottomCtx.restore();		
}

function redrawInterface(){
	bottomCtx.strokeStyle="black";
	bottomCtx.save();
	bottomCtx.translate(canvasWidth/2, canvasHeight);
	bottomCtx.rotate(Math.PI/180 * angle);	
	
	bottomCtx.fillStyle="white";
	bottomCtx.beginPath();
	bottomCtx.arc(0, 0, 99, 0, 2*Math.PI, false);
	bottomCtx.closePath();
	bottomCtx.fill();
	
	bottomCtx.fillStyle = "black";
	bottomCtx.beginPath();
	bottomCtx.moveTo(-100,0);
	bottomCtx.lineTo(-86,10);
	bottomCtx.lineTo(-93,0);

	bottomCtx.lineTo(-86,-10);
	bottomCtx.fill();
	bottomCtx.moveTo(-100,0);
	bottomCtx.lineTo(100,0);
	
	bottomCtx.arc(0, 0, 30, 0, 2*Math.PI, false);
	bottomCtx.stroke();
	bottomCtx.fill();
	bottomCtx.moveTo(100,10);
	bottomCtx.lineTo(100,-10);
	bottomCtx.lineTo(-100,0);
	bottomCtx.fill();	
	
	bottomCtx.restore();			
}

function draw(){
	topCtx.clearRect(0, 0, canvasWidth, canvasHeight);
	
	//Animates the bouncing balls.
	for(var i = 0; i < balls.length ; i++){
		var ball = balls[i];
		topCtx.strokeStyle=ball.col;
		topCtx.fillStyle=ball.col;
		topCtx.beginPath();
		
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

	//animates a shotBall if one exists.
	for(i = 0; i < shotBalls.length ; i++){
		var ball = shotBalls[i];
		topCtx.strokeStyle=ball.col;
		topCtx.fillStyle=ball.col;
		topCtx.beginPath();
		
		if(ball.x<=ball.radius || ball.x >= (width-ball.radius)){
			ball.dx *= -1;
		}
		if(ball.y<=ball.radius || ball.y >= (height+.1)){
			ball.dy *= -1;
		}
		if(ball.dy == 1 && (ball.y-(height-110))>0){
			ball.dy *= -1;

		}
		ball.x += ball.dx;ball.x += ball.dx;ball.x += ball.dx;
		ball.y += ball.dy;ball.y += ball.dy;ball.y += ball.dy;
		
		topCtx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
		topCtx.stroke();
		topCtx.fill();
		
		if(balls.some(isCollision)){
			balls[collidedBallIndex].dx=0;
			balls[collidedBallIndex].dy=0;
			shotBalls.pop();

			balls[collidedBallIndex].col="red";
			if(collidedBallIndex == correctBall){	
				balls[collidedBallIndex].col="green";
				draw();
				topCtx.fillStyle = "black"
				topCtx.textBaseline = "middle";
				topCtx.textAlign = "center";
				topCtx.font = "bold 12px arial";
				topCtx.fillText(balls[collidedBallIndex].letter + " is the Correct Answer!",width/2,10);
			}
		}
	}
}