/***********************************************/
/*                CONSTANTES                   */
/***********************************************/

const WIDTH = 450;
const HEIGHT = 450;
const SCL = 30; /*tem que ser multipla de WIDTH, HEIGHT*/
const NUMBER_CARS = 4;
const NUMBER_CAR_LANES = 3;
const CAR_SPEED = 1;
const NUMBER_LILYPADS = 4;
const NUMBER_LILYPAD_LANES = 5;
const LILYPAD_SPEED = 0.2;

/***********************************************/
/*               VARS GLOBAIS                  */
/***********************************************/

var cnv;
var player;
var carLanes;
var lilypadLanes;
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
  carLanes = new CarLanes(SCL*2, SCL, CAR_SPEED, NUMBER_CARS, NUMBER_CAR_LANES);
  lilypadLanes = new LilypadLanes(SCL, SCL, LILYPAD_SPEED, NUMBER_LILYPADS, NUMBER_LILYPAD_LANES);
  carLanes.init();
  lilypadLanes.init();
  
}

function windowResized() {
  centerCanvas();
}


function draw(){
  
  if(!inMenu){
    background("#222222"); 
    drawWorld();

    player.show(); 
    
    lilypadLanes.update();
    lilypadLanes.show();
    
    carLanes.update();
    carLanes.show();
    
    lilypadLanes.update();
    lilypadLanes.show();
    
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
  carLanes.reset(true);
  lilypadLanes.reset();
}

function detectCarCollision() {
  var i, j, flag = false;
  for(i = 0; i < NUMBER_CAR_LANES; i++) {
    for(j = 0; j < NUMBER_CARS; j++) {
      var lane = carLanes.getLane(i);
      var car = lane.getSingleElement(j);
      if(player.intersects(car)) flag = true;
    }
  }
  return flag;
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

