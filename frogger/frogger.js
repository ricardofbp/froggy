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
    /*no need to call .move 'cus it is handled in keyPressed(), only need to draw the player*/
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
  fill(0, 240, 0);
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
  
  /*player movement is done by simply adding a unit == scl to the current position*/
  if (keyCode === UP_ARROW)    player.move(0,-1);
  if (keyCode === DOWN_ARROW)  player.move(0,1);
  if (keyCode === LEFT_ARROW)  player.move(-1,0);
  if (keyCode === RIGHT_ARROW) player.move(1,0);
  
}

function Frog() {
  this.x = 0;
  this.y = 0;
  
  /*receives 1 or 0 (can be negative) and summs to the current position*/
  /*constrain constrains the min and max value the player's position can have*/
  this.move = function(x, y) {
    this.x = constrain(this.x + (x * SCL), 0, WIDTH - SCL);
    this.y = constrain(this.y + (y * SCL), 0, HEIGHT - SCL);
  }
  
  this.show = function() {
    fill(255);
    rect(this.x, this.y, SCL, SCL);
  }
}