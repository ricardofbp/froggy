class Frog {
  constructor() {
    this.height = SCL;
    this.width = SCL;
    this.size = SCL;
    this.x1 = WIDTH/2 - this.width/2;
    this.y1 = HEIGHT - this.height;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
    this.isOnLilypad = false;
    this.speed = 0;
    this.score = 0;
  }
  
  move(x, y) {
    console.log(this.y1);
    this.x1 = constrain(this.x1 + (x * SCL) + this.speed, 0, WIDTH - SCL);
    this.y1 = constrain(this.y1 + (y * SCL), 0, HEIGHT - SCL);
    this.x2 = constrain(this.x2 + (x * SCL) + this.speed, SCL, WIDTH);
    this.y2 = constrain(this.y2 + (y * SCL), SCL, HEIGHT);
    this.updateScore();
  }
  
  moveOnLilypad(lilypad) {
    this.x1 = lilypad.getX1();
    this.x2 = lilypad.getX2();
  }
  
  show() {
    var graphicSize = this.size * 0.70;
    push();
    fill(0, 250, 0);
    translate((this.size - graphicSize)/2, (this.size - graphicSize)/2);
    rect(this.x1, this.y1, graphicSize, graphicSize);
    pop();
  }
  
  intersects(obj) {
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
    if (this.score <= 250)
    this.score += SCL*1.5;  
  }
  
  
  getScore() {
    return this.score;
  }
  
  setScore(nr_lvl , time_elapsed){
    this.score += SCORE * (nr_lvl * (1/time_elapsed)); 
  }
  
  isOnLilypad() { return this.onLilypad; }
  
  setOnLilypad(lilypad, b) { 
    this.isOnLilypad = b; 
    if(!b) this.speed = 0;
    else if (b && lilypad != null) this.speed = lilypad.speed;
  }
}