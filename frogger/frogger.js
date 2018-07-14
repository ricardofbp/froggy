/***********************************************/
/*                CONSTANTES                   */
/***********************************************/

const WIDTH = 400;
const HEIGHT = 400;


/***********************************************/
/*               VARS GLOBAIS                  */
/***********************************************/

var cnv;
var frog;
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
}