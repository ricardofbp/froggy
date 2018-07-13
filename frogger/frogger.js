var cnv;
const WIDTH = 400;
const HEIGHT = 400;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
	
}

function play() {
  var s = 'The quick brown fox jumped over the lazy dog.';
  fill(255);
  translate(WIDTH/2 - 45, HEIGHT/2 - 45);
  text(s, 10, 10, 80, 80); // Text wraps within text box
}

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  centerCanvas();
	background("#222222");
  play();
}

function windowResized() {
  centerCanvas();
}

