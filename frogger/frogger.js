/***********************************************/
/*                CONSTANTES                   */
/***********************************************/

const WIDTH = 400;
const HEIGHT = 400;
const SCL = 20; /*tem que ser multipla de WIDTH, HEIGHT*/


/***********************************************/
/*               VARS GLOBAIS                  */
/***********************************************/


var cnv;
var player;
var inMenu = true;

/***********************************************/
/*                FUNCOES                      */
/***********************************************/


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  centerCanvas();
	background("#222222");
  menuScreen();
  player = new Frog();
}

function windowResized() {
  centerCanvas();
}


function draw(){
  
  if(!inMenu){
    background("#222222"); 
    push();
    fill(random(255), random(255), random(255));
    translate(WIDTH/2 - 50, HEIGHT/2 - 100);
    textSize(30);
    text("DRAW F R E N E T I C O", 0, 0, 100, 300); 
    pop();
    
    player.show();
  }
}


function menuScreen() {
  /* desativa o draw */
  noLoop();
  
  var begin = 'PRESS SPACEBAR TO PLAY';
  var title = "FROGGER";
  
  background("#222222");   
  fill(255);
  
  push();
  translate(WIDTH/2 - 100, HEIGHT/2 - 100);
  textSize(40);
  text(title, 0, 0, 50, 100);
  pop();
  
  push();
  translate(WIDTH/2 - 135, HEIGHT/2 + 30);
  textSize(20);
  text(begin, 0, 0, 280, 40);
  pop();
}


function keyPressed() {
  if (keyCode === 32) {
    clear();
    inMenu = !inMenu;
    
    /*verifica se o user vai para o menu: 
      se sim, chama o menuScreen
      se nao, reativa o draw (chamando o loop())*/
    if(!inMenu) {
      loop();
    }
    else if(inMenu) {
      menuScreen();
    }
    
    console.log("inMenu: " + inMenu);
  }
  
  if (keyCode === UP_ARROW) player.move(0,-1);
  if (keyCode === DOWN_ARROW) player.move(0,1);
  if (keyCode === LEFT_ARROW) player.move(-1,0);
  if (keyCode === RIGHT_ARROW) player.move(1,0);
  
}

function Frog() {
  this.x = 0;
  this.y = 0;
  
  this.move = function(x, y) {
    this.x = this.x + x*SCL;
    this.y = this.y + y*SCL;
  }
  
  this.show = function() {
    fill(255);
    rect(this.x, this.y, SCL, SCL);
  }
}