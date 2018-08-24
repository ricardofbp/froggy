/***********************************************/
/*                CONSTANTES                   */
/***********************************************/

const WIDTH = 450;
const HEIGHT = 450;
const SCL = 30; /*tem que ser multiplo de WIDTH, HEIGHT*/
const NUMBER_CARS = 4;
const NUMBER_CAR_LANES = 3;
const CAR_SPEED = 1;
const NUMBER_LILYPADS = 3;
const NUMBER_LILYPAD_LANES = 5;
const LILYPAD_SPEED = 0.4;
const SCORE = 6969;

/***********************************************/
/*               VARS GLOBAIS                  */
/***********************************************/

var cnv;
var player;
var level = 1;
var carLanes;
var lilypadLanes;
var inMainMenu = true;
var inLevelMenu = false;
var inGameOverMenu = false;
var world;
var noGraphics = true;

var img_frog;
var img_car;
var img_lilypad;


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
  
  world = new World();
  player = new Frog();
  carLanes = new CarLanes(SCL*2, SCL, CAR_SPEED, NUMBER_CARS, NUMBER_CAR_LANES);
  lilypadLanes = new LilypadLanes(SCL, SCL, LILYPAD_SPEED, NUMBER_LILYPADS, NUMBER_LILYPAD_LANES);
  
  carLanes.init();
  lilypadLanes.init();//
  
  img_frog = loadImage('../assets/crazy_frog.png');
  img_car = loadImage('../assets/car.png');
  img_lilypad = loadImage('../assets/lilypad.png');
}

function windowResized() {
  centerCanvas();
}


function draw(){
  
  if(!inMainMenu){
    background("#222222"); 
    world.show();

    carLanes.show();
    lilypadLanes.show();
    player.show(); 
    showTime();
    showScore();
    
    lilypadLanes.update();
    carLanes.update();
    
    var lilypad = detectLilypadCollision();
    
    if (detectCarCollision() || detectRiverCollision()) 
      gameOver();
    if (detectEndingCollision())
      levelPassed();
    
    
    if (player.isOnLilypad){
      player.moveOnLilypad(lilypad);
    }
    
  }
}


function menuScreen() {
  /* desativa o draw */
  noLoop();
  inMainMenu = true;
 
  var title = "FROGGER";
  var begin = 'PRESS SPACEBAR TO PLAY';
  var graphics = 'PRESS G TO ACTIVATE OR DEACTIVATE SPRITES'
  
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
  
  push();
  translate(WIDTH/2 - 135, HEIGHT/2 + 80);
  textSize(20);
  text(graphics, 0, 0, 300, 100);
  pop();

}


function keyPressed() {
  if (keyCode === 32) {
    clear();
    /*verifica se o user vai para o menu: 
      se sim, chama o menuScreen
      se nao, reativa o draw (chamando o loop())*/
    if(inMainMenu) {
      inMainMenu = false;
      loop();
      startTimer();
    }
    
    else if(inLevelMenu) {
      inLevelMenu = false;
      loop();
      startTimer();
    }
    
    else if(inGameOverMenu) {
      inGameOverMenu = false;
      menuScreen();
      reset(true);
    }
    
    console.log("inMainMenu: " + inMainMenu);
  }
  
  /*player movement is done by simply adding a unit == scl to the current position*/
  if(!inMainMenu){  /*prevents user from moving the frog in the menu screen*/
    if (keyCode === UP_ARROW) {
      player.move(0,-1);
      player.updateScore();  
    }
    if (keyCode === DOWN_ARROW)  player.move(0,1); /*will be disabled in final build, frog only moves up*/
    if (keyCode === LEFT_ARROW)  player.move(-1,0);
    if (keyCode === RIGHT_ARROW) player.move(1,0);
    if (keyCode === 71)          {noGraphics = !noGraphics; /*letter 'g'*/ console.log("noGraphics = " + noGraphics);}
    if (keyCode === 76)          changeLevel(); /*letter 'l'*/
    if (keyCode === 80) levelPassed();
    if (keyCode === 82) {
      menuScreen();
      reset();
      inMainMenu = true;
    }
  }
  
}

function gameOver() {
  noLoop();
  clear();
  inGameOverMenu = true;

 
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
  
  reset(false);
}

function changeLevel() {
  
  level++;
  var i;
  
  for(i = 0; i < NUMBER_CAR_LANES; i++) {
    
    lane = carLanes.getLane(i);
    if(lane.getSpeed() < 0) {
      var newSpeed = lane.getSpeed() - CAR_SPEED*0.38;
      lane.setSpeed(newSpeed); 
    }
    
    else {
      var newSpeed = lane.getSpeed() + CAR_SPEED*0.38;
      lane.setSpeed(newSpeed); 
    }
  }
  
  for(i = 0; i < NUMBER_LILYPAD_LANES; i++) {
    
    lane = lilypadLanes.getLane(i);
    if(lane.getSpeed() < 0) {
      var newSpeed = lane.getSpeed() - LILYPAD_SPEED*0.29;
      lane.setSpeed(newSpeed); 
    }
    
    else {
      var newSpeed = lane.getSpeed() + LILYPAD_SPEED*0.29;
      lane.setSpeed(newSpeed); 
    }
  }
  
  reset(false);
  
}

function levelPassed() {
  noLoop();
  clear();
  player.setScore(level, totalSeconds);
  inMainMenu = false;
  inLevelMenu = true;
  
  
  var over = 'LEVEL ' + level + ' PASSED';
  var restart = "PRESS SPACEBAR TO CONTINUE";
  var playerScore = "SCORE: " + round(player.getScore());
  
  changeLevel();
  
  background("#222222");   
  fill(255);
  
  push();
  fill(255);
  textStyle(BOLD);
  if (level < 10) translate(WIDTH/2 - 185, HEIGHT/3);
  else translate(WIDTH/2 - 193, HEIGHT/3);
  textSize(40);
  text(over, 0, 0, 450, 50);
  pop();
  
  push();
  translate(WIDTH/2 - 160, HEIGHT/2 + 30);
  textSize(20);
  text(restart, 0, 0, 350, 40);
  pop();
  
  push();
  translate(WIDTH/2 - 90, HEIGHT/2 + 90);
  textSize(25);
  text(playerScore, 0, 0, 350, 40);
  pop();
  
}

function reset(totalReset) {

  timerReset();
  player.reset();
  carLanes.reset(true);
  lilypadLanes.reset(true);
  
  if (totalReset) {
    level = 1;
  }
  
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
  return player.y1 < world.endZone.getY2();
}  

function detectLilypadCollision() {
  var i, j;
  for(i = 0; i < NUMBER_LILYPAD_LANES; i++) {
    for(j = 0; j < NUMBER_LILYPADS; j++) {
      var lane = lilypadLanes.getLane(i);
      var lilypad = lane.getSingleElement(j);
      if(player.intersects(lilypad)) {
        player.setOnLilypad(lilypad, true);
        return lilypad;
      }
    }
  }
  player.setOnLilypad(lilypad, false);
  return false;
}

function detectRiverCollision(){
  //if player crosses the river without being on a lilypad
  return (!player.isOnLilypad && player.y1 < world.river.getY2()) && player.y1 > world.river.getY1();
}

function showScore() {
  //displays the score on the level screen
  push();
  stroke(0, 0, 0);
  fill(255, 255, 255);
  translate(SCL/3, SCL/3);
  textSize(15);
  text("SCORE: " + player.getScore(), 0, 0, 100, 20);
  pop();
}

function showTime() {
  //displays the playing time on the level screen
  var seconds = tSeconds;
  var minutes = tMinute;
  seconds = checkTime(seconds);
  minutes = checkTime(minutes);
  push();
  stroke(0, 0, 0);
  fill(255, 255, 255);
  translate(WIDTH - 60, SCL/3);
  textSize(15);
  text(minutes + ":" + seconds, 0, 0, 60, 50);
  pop();
}