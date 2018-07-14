function Car(y) {
  this.x = 0;
  this.y = y;
  this.speed = 1;
  
  this.update = function() {
    this.x = constrain(this.x + this.speed, 0, HEIGHT-SCL);
  }
  
  this.reset = function() {
    this.x = 0;
  }
  
  this.show = function() {
    fill(100, 0, 0);
    rect(this.x, this.y, SCL, SCL);
  }
}