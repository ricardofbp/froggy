function Car(y) {
  this.x = 0;
  this.y = y;
  this.originalX = 0;
  this.speed = 1;
  
  this.update = function() {
    if(this.x == WIDTH + SCL) this.reset();
    this.x = this.x + this.speed;
  }
  
  this.reset = function() {
    this.x = this.originalX - SCL;
  }
  
  this.show = function() {
    fill(100, 0, 0);
    rect(this.x, this.y, SCL, SCL);
  }
}