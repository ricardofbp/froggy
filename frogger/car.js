class Car {
  constructor(y) {
    this.size = SCL;
    this.x1 = 0;
    this.y1 = y;
    this.x2 = this.x1 + this.size*2;
    this.y2 = this.y1 + this.size;
    this.speed = 1;
  }
  
  update() {
    if(this.x1 == WIDTH + this.size) this.reset();
    this.x1 += this.speed;
    this.x2 += this.speed;
  }
  
  /*no need to reset y 'cus its always the same*/
  reset() {
    this.x1 = 0 - this.size;
    this.x2 = this.x1 + this.size;
  }
  
  show() {
    fill(100, 0, 0);
    rect(this.x1, this.y1, this.size*2, this.size);
  }
  
}