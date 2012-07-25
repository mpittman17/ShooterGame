var angle = 90;
var topCanvas;
var bottomCanvas;
var canvasWidth;
var canvasHeight;
var topCtx;
var bottomCtx;
var numberOfBalls = 4;
var correctBall = 2;
var balls;
var image = new Image();

image.src = "ball.png";
//Checks for browser support
function checkSupported() {
	topCanvas = document.getElementById('topCanvas');
	bottomCanvas = document.getElementById('bottomCanvas');
	if (topCanvas.getContext) {
		topCtx = topCanvas.getContext('2d');
		bottomCtx = bottomCanvas.getContext('2d');
	} else {
		alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
	}
	initialize();
}

//Starts game
function initialize() {
	//Canvas height & width are set to 90% of window size
	height = window.innerHeight * .9;
	width = window.innerWidth * .9;
	topCanvas.width = width;
	topCanvas.height = height;
	bottomCanvas.width = width;
	bottomCanvas.height = height;
	canvasWidth = width;
	canvasHeight = height;

	touchInitialize();	
	initializeBalls(numberOfBalls, correctBall);
	initializeInterface();

	path();  
}

function initializeBalls(theBalls, theAnswer){
	balls = new Array(theBalls);
	for(var i= 0 ; i < balls.length ; i++){
		balls[i] = new ball();
		balls[i].letter = String.fromCharCode(balls[i].letter.charCodeAt() + i);

	}
	//Creates the array of shot balls
	//shotBalls = new Array(0);
}

function initializeInterface(){

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

function ball(){
	this.radius = .02 * width;
	this.x = (Math.random()*(width-(2*this.radius))+this.radius) << 0;
	this.y = (Math.random()*(height-(2*this.radius))+this.radius) << 0;
	this.dx = Math.random()*4;
	this.dy = Math.sqrt(16-Math.pow(this.dx,2));
	//this.dx = Math.random();
	//this.dy = Math.sqrt(1-Math.pow(this.dx,2));
	this.col = "lightblue";
	this.letter = "A";
}

function path(){
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    (function animloop(){
      requestAnimFrame(animloop);
      draw();
    })();
	
	allowPressKeys = true;
}