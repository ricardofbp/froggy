var cnv;
var frog;
const WIDTH = 400;
const HEIGHT = 400;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
	
}

function play() {
  var s = 'PRESS F to PLAY';
  fill(255);
  translate(WIDTH/2 - 45, HEIGHT/2 - 45);
  text(s, 10, 10, 80, 80); // Text wraps within text box
  
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


function keyPressed(){
  if (keyCode  === 70){
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