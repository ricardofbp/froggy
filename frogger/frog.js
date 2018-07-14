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