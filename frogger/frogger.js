var cnv;
var frog;
const WIDTH = 400;
const HEIGHT = 400;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
	
}

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  centerCanvas();
	background("#222222");
  playScreen();
}

function windowResized() {
  centerCanvas();
}

function draw(){
  if (keyCode  === 32){
    clear();
  }
}


function playScreen() {
  var begin = 'PRESS SPACEBAR TO PLAY';
  var title = "FROGGER"
  fill(255);
  push();
  translate(WIDTH/2 - 100, HEIGHT/2 - 100);
  textSize(40);
  text(title, 0, 0, 50, 100);
  pop();
  push();
  translate(WIDTH/2 - 135, HEIGHT/2 + 30);
  textSize(20);
  text(begin, 0, 0, 280, 40); // Text wraps within text box
  pop();
}