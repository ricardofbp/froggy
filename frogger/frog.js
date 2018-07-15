class Frog {
  constructor() {
    this.height = SCL;
    this.width = SCL;
    this.size = SCL;
    this.x1 = WIDTH/2 - this.width/2;
    this.y1 = HEIGHT - this.height;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
    this.score = 0;
  }
  
  move(x, y) {
    this.x1 = constrain(this.x1 + (x * SCL), 0, WIDTH - SCL);
    this.y1 = constrain(this.y1 + (y * SCL), 0, HEIGHT - SCL);
    this.x2 = constrain(this.x2 + (x * SCL), SCL, WIDTH);
    this.y2 = constrain(this.y2 + (y * SCL), SCL, HEIGHT);
  }
  
  show() {
    var graphicSize = this.size * 0.70;
    push();
    fill(0, 240, 0);
    translate((this.size - graphicSize)/2, (this.size - graphicSize)/2);
    rect(this.x1, this.y1, graphicSize, graphicSize);
    pop();
  }
  
  intersects(obj) {
    console.log(this.x1 < obj.x2 && this.x2 > obj.x1 && this.y1 < obj.y2 && this.y2 > obj.y1);
    return (this.x1 < obj.x2 && this.x2 > obj.x1 && this.y1 < obj.y2 && this.y2 > obj.y1)
  }
  
  
  reset() {
    this.x1 = WIDTH/2 - this.width/2;
    this.y1 = HEIGHT - this.height;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
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