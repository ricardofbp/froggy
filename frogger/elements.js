class SingleElement {
  
  constructor(x, y, width, height, speed) {
    this.width = width;
    this.height = height;
    this.x1 = x;
    this.y1 = y;
    this.x2 = this.x1 + width;
    this.y2 = this.y1 + height;
    this.originalX = this.x1;
    this.speed = speed;
  }
  
  update() {
    if ((this.x1 >= WIDTH && this.speed > 0)  || (this.x1 <= 0 - this.width && this.speed < 0)) {
      this.reset(false);
    } 
    this.x1 += this.speed;
    this.x2 += this.speed;
  }
  
  reset(totalReset) {
    if (this.speed < 0 ) this.x1 = totalReset ? this.originalX : WIDTH + this.width;
    else this.x1 = totalReset ? this.originalX : 0 - this.width;
    this.x2 = this.x1 + this.width;
  }
  
  show() {
    fill(100, 0, 0);
    rect(this.x1, this.y1, this.width, this.height);
  }
  
  getX1() {return this.x1;}
  getX2() {return this.x2;}
  getY1() {return this.Y1;}
  getY2() {return this.Y2;}
}


class SingleLane {
  
  constructor(y, width, height, speed, numElems) {
    this.width = width;
    this.height = height;
    this.y = y;
    this.elements = [];
    this.numElems = numElems;
    this.speed = speed;
  }
  
  init(){console.log("NOT SUPPOSED LOL");}
  
  reset(totalReset) {
    var i;
    for(i = 0; i < this.elements.length; i++) {
      this.elements[i].reset(totalReset);
    }
  }
  
  update() {
    var i;
    for(i = 0; i < this.elements.length; i++) {
      this.elements[i].update();
    }
  }
  
  show() {
    var i;
    for(i = 0; i < this.elements.length; i++) {
      this.elements[i].show();
    }
  }
  
  getSingleElement(i) { return this.elements[i]; }
}



class MultipleLanes {
  constructor(width, height, speed, numElems, numLanes) {
    this.width = width;
    this.height = height;
    this.lanes = [];
    this.numElems = numElems;
    this.speed = speed;
    this.numLanes = numLanes;
  }
  
  init(){console.log("NOT SUPPOSED LOL");}
  
  update(){
    var i;
    for(i = 0; i < this.lanes.length; i++) {
      this.lanes[i].update();
    }
  }
  
  show(){
    var i;
    for(i = 0; i < this.lanes.length; i++) {
      this.lanes[i].show();
    }
  }
  
  reset(totalReset){
    var i;
    for(i = 0; i < this.lanes.length; i++) {
      this.lanes[i].reset(totalReset);
    }
  }
  
  getLane(i) { return this.lanes[i]; }
}