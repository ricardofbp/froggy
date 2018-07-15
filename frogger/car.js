class Car {
  constructor(y) {
    this.width = SCL*2;
    this.height = SCL;
    this.x1 = 0 - this.width;
    this.y1 = y;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
    this.speed = 1;
  }
  
  update() {
    if(this.x1 == WIDTH + this.width) this.reset();
    this.x1 += this.speed;
    this.x2 += this.speed;
  }
  
  /*no need to reset y 'cus its always the same*/
  reset() {
    this.x1 = 0 - this.width;
    this.x2 = this.x1 + this.width;
  }
  
  show() {
    fill(100, 0, 0);
    rect(this.x1, this.y1, this.width, this.height);
  }
  
}