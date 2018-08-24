class Car extends SingleElement{
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
  }
  
  show() {
    push();
    if (noGraphics) {
      fill(200, 0, 0);
      stroke(100, 15, 15);
      rect(this.x1, this.y1, this.width, this.height);
    }
    else {
      image(img_car,this.x1, this.y1);
    }
    pop();
  }
}

class CarLane extends SingleLane{
  constructor(y, width, height, speed, numElems) {
    super(y, width, height, speed, numElems);
    this.space = random(SCL*4, SCL*4.5);
  }
  
  init() {
    var i;  

    for(i = 0; i < this.numElems; i++) {
     
      if (this.speed > 0){
        var prevX = this.elements.length === 0 ? WIDTH : this.elements[i-1].getX1();
        var element = new Car(prevX - this.space, this.y, this.width, this.height, this.speed);
      }

      else {
        var prevX = this.elements.length === 0 ? 0 : this.elements[i-1].getX1();
        var element = new Car(prevX + this.space, this.y, this.width, this.height, this.speed);
      }

      this.elements.push(element);
    }
  }
  
}

class CarLanes extends MultipleLanes{
  
  constructor(width, height, speed, numElems, numLanes) {
    super(width, height, speed, numElems, numLanes);
  }
  
  init(){
    var i;
    for(i = 0; i < this.numLanes; i++) {
      //makes different lanes have different orientations
      this.speed = -1*this.speed;
      var lane =  new CarLane(390 - (i*SCL*3), this.width, this.height, this.speed, this.numElems);
      lane.init();
      this.lanes.push(lane);
    }
  }
}