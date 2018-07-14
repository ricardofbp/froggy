/***********************************************/
/*                CONSTANTES                   */
/***********************************************/

const WIDTH = 450;
const HEIGHT = 450;
const SCL = 30; /*tem que ser multipla de WIDTH, HEIGHT*/


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
  var y = (windowHeight*1.1 - height) / 2;
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
    drawWorld();
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
  textStyle(BOLD);
  translate(WIDTH/2 - 105, HEIGHT/4);
  textSize(40);
  text(title, 0, 0, 200, 50);
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
      player.reset();
    }
    
    console.log("inMenu: " + inMenu);
  }
  
  /*player movement is done by simply adding a unit == scl to the current position*/
  if(!inMenu){  /*prevents user from moving the frog in the menu screen*/
    if (keyCode === UP_ARROW)    {
      player.move(0,-1);
      player.updateScore();  
      console.log(player.getScore());
    }
    if (keyCode === DOWN_ARROW)  player.move(0,1); /*will be disabled in final build, frog only moves up*/
    if (keyCode === LEFT_ARROW)  player.move(-1,0);
    if (keyCode === RIGHT_ARROW) player.move(1,0);
  }
  
}

function showScore() {
  
}

function drawWorld() {
  var totalUnits = HEIGHT/SCL

  push();
  fill(50, 70, 180);
  rect(0, 0, WIDTH, SCL*Math.floor(totalUnits*0.4));
  pop();
  
  push();
  fill(230);
  rect(0, SCL*Math.floor(totalUnits*0.4), WIDTH, SCL);
  pop();
  
  push();
  fill(230);
  rect(0, HEIGHT - SCL, WIDTH, SCL);
}

function Frog() {
  this.x = WIDTH/2 - SCL/2;
  this.y = HEIGHT - SCL;
  this.score = 0;
  
  /*receives 1 or 0 (can be negative) and summs to the current position*/
  /*constrain constrains the min and max value the player's position can have*/
  this.move = function(x, y) {
    this.x = constrain(this.x + (x * SCL), 0, WIDTH - SCL);
    this.y = constrain(this.y + (y * SCL), 0, HEIGHT - SCL);
  }
  
  this.show = function() {
    fill(0, 240, 0);
    rect(this.x, this.y, SCL, SCL);
  }
  
  this.reset = function() {
    this.x = WIDTH/2 - SCL/2;
    this.y = HEIGHT - SCL;  
    this.score = 0;
  }
  
  /*rudimentar */
  this.updateScore = function() {
    this.score += SCL;  
  }
  
  /*good practice*/
  this.getScore = function() {
    return this.score;
  }
}