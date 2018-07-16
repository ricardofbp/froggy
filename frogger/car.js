class Car extends SingleElement{
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
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
      var prevX = this.elements.length === 0 ? random(WIDTH/4, WIDTH/2) : this.elements[i-1].getX1();
      
      if (this.speed > 0){
        var element = new Car(prevX - this.space, this.y, this.width, this.height, this.speed);
      }

      else {
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
      this.speed = -1*this.speed;
      var lane =  new CarLane(390 - (i*SCL*3), this.width, this.height, this.speed, this.numElems);
      lane.init();
      this.lanes.push(lane);
    }
  }
}


