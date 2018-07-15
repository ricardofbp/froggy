class Frog {
  constructor() {
    this.size = SCL;
    this.x1 = WIDTH/2 - SCL/2;
    this.y1 = HEIGHT - SCL;
    this.x2 = this.x1 + this.size;
    this.y2 = this.y1 + this.size;
    this.score = 0;
  }
  
  move(x, y) {
    this.x1 = constrain(this.x1 + (x * SCL), 0, WIDTH - SCL);
    this.y1 = constrain(this.y1 + (y * SCL), 0, HEIGHT - SCL);
    this.x2 = constrain(this.x2 + (x * SCL), 0, WIDTH - SCL);
    this.y2 = constrain(this.y2 + (y * SCL), 0, HEIGHT - SCL);
  }
  
  show() {
    var graphicSize = this.size * 0.70;
    push();
    fill(0, 240, 0);
    translate((this.size - graphicSize)/2, (this.size - graphicSize)/2);
    rect(this.x1, this.y1, graphicSize, graphicSize);
    pop();
  }
  
  reset() {
    this.x1 = WIDTH/2 - SCL/2;
    this.y1 = HEIGHT - SCL;
    this.x2 = this.x1 + this.size;
    this.y2 = this.y1 + this.size;
    this.score = 0;
  }
  
  /*rudimentar */
  updateScore() {
    this.score += SCL;  
  }
  
  /*good practice*/
  getScore() {
    return this.score;
  }
}


/*
function Frog() {
  this.x = WIDTH/2 - SCL/2;
  this.y = HEIGHT - SCL;
  this.score = 0;
  this.size = SCL
  

  receives 1 or 0 (can be negative) and summs to the current position
  constrain constrains the min and max value the player's position can have
  this.move = function(x, y) {
    this.x = constrain(this.x + (x * SCL), 0, WIDTH - SCL);
    this.y = constrain(this.y + (y * SCL), 0, HEIGHT - SCL);
  }
  
  this.show = function() {
    graphicSize = this.size * 0.70
    push();
    fill(0, 240, 0);
    translate((this.size - graphicSize)/2, (this.size - graphicSize)/2);
    rect(this.x, this.y, graphicSize, graphicSize);
    pop();
  }
  
  this.reset = function() {
    this.x = WIDTH/2 - SCL/2;
    this.y = HEIGHT - SCL;  
    this.score = 0;
  }
  
  rudimentar 
  this.updateScore = function() {
    this.score += SCL;  
  }
  
  /*good practice
  this.getScore = function() {
    return this.score;
  }
}
*/