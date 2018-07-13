var cnv;
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
}

function windowResized() {
  centerCanvas();
}