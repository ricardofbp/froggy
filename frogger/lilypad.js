class Lilypad extends SingleElement{
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
  }
  show() {
    fill(100, 0, 0);
    image(img_lilypad,this.x1, this.y1);
  }
  
}


class LilypadLane extends SingleLane{
  constructor(y, width, height, speed, numElems) {
    super(y, width, height, speed, numElems);
    this.space = random(SCL*4, SCL*6);
  }

  init() {
    var i;  

    for(i = 0; i < this.numElems; i++) {
      
      if (this.speed > 0){
        var prevX = this.elements.length === 0 ? random(WIDTH/4, WIDTH/2) : this.elements[i-1].getX1();
        var element = new Lilypad(prevX - this.space, this.y, this.width, this.height, this.speed);
      }

      else {
        var prevX = this.elements.length === 0 ? random(WIDTH/2 - this.width, 3*WIDTH/4) : this.elements[i-1].getX1();
        var element = new Lilypad(prevX + this.space, this.y, this.width, this.height, this.speed);
      }

      this.elements.push(element);
    }
  }
  
}

class LilypadLanes extends MultipleLanes{
  
  constructor(width, height, speed, numElems, numLanes) {
    super(width, height, speed, numElems, numLanes);
  }
  
  init(){
    var i;
    for(i = 0; i < this.numLanes; i++) {
      this.speed = -1*this.speed;
      var lane =  new LilypadLane(150 - (i*SCL), this.width, this.height, this.speed, this.numElems);
      lane.init();
      this.lanes.push(lane);
    }
   console.log(this.lanes);
  }
}