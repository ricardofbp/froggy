/***********************************************/
/*                CONSTANTES                   */
/***********************************************/

const WIDTH = 450;
const HEIGHT = 450;
const SCL = 30; /*tem que ser multipla de WIDTH, HEIGHT*/
const NUMBER_CARS = 4


/***********************************************/
/*               VARS GLOBAIS                  */
/***********************************************/

var cnv;
var player;
var cars;
var lilypad1;
var lilypad2;
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
  cars = new CarLane(300, NUMBER_CARS);
  cars.init();
  lilypad1 =  new Lilypad(150,0.5);
  lilypad2 =  new Lilypad(120,-0.5);
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
    cars.update();
    cars.show();
    lilypad1.update();
    lilypad1.show();
    lilypad2.update();
    lilypad2.show();
    if(detectCarCollision()) 
      gameOver();
    if (detectEndingCollision())
      gameOver();
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
      reset();
    }
    
    console.log("inMenu: " + inMenu);
  }
  
  /*player movement is done by simply adding a unit == scl to the current position*/
  if(!inMenu){  /*prevents user from moving the frog in the menu screen*/
    
    
    
    if (keyCode === UP_ARROW) {
      player.move(0,-1);
      player.updateScore();  
    }
    if (keyCode === DOWN_ARROW)  player.move(0,1); /*will be disabled in final build, frog only moves up*/
    if (keyCode === LEFT_ARROW)  player.move(-1,0);
    if (keyCode === RIGHT_ARROW) player.move(1,0);
    
    /*
    console.log("frog: " + player.x1 + ", " + player.y1 + " | " + player.x2 + ", " + player.y2);
    console.log("car: " + car.x1 + ", " + car.y1 + " | " + car.x2 + ", " + car.y2);
    */
  }
  
}

function gameOver() {
  noLoop();
 
  var over = 'GAME OVER';
  var restart = "PRESS SPACEBAR TO RESTART";
  
  background("#222222");   
  fill(255);
  
  push();
  fill(255);
  textStyle(BOLD);
  translate(WIDTH/2 - 140, HEIGHT/3);
  textSize(40);
  text(over, 0, 0, 300, 50);
  pop();
  
  push();
  translate(WIDTH/2 - 160, HEIGHT/2 + 30);
  textSize(20);
  text(restart, 0, 0, 350, 40);
  pop();
}

function reset() {
  player.reset();
  cars.reset();
}

function detectCarCollision() {
 // return player.x1 < car.x2 && player.x2 > car.x1 && player.y1 < car.y2 && player.y2 > car.y1
}

function detectEndingCollision(){
  return player.y1 === 0;
}  

function detectRiverCollision(){
  
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

