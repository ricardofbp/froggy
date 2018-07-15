class Car {
  constructor(y) {
    this.x = 0;
    this.y = y;
    this.originalX = 0;
    this.speed = 1;
  }
  
  update() {
    if(this.x == WIDTH + SCL) this.reset();
    this.x = this.x + this.speed;
  }
  
  reset() {
    this.x = this.originalX - SCL;
  }
  
  show () {
    fill(100, 0, 0);
    rect(this.x, this.y, SCL, SCL);
  }
  
}