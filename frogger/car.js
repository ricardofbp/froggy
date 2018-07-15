class Car {
  
  constructor(x, y) {
    this.size = SCL;
    this.width = SCL*2;
    this.height = SCL;
    this.x1 = x - this.width;
    this.y1 = y;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
    this.speed = 1.3;
  }
  
  update() {

    if(this.x1 >= WIDTH + this.size) 
      this.reset();
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
  
  getX1() {return this.x1;}
}


class CarLane {
  
  constructor(y, n) {
    var self = this;
    this.cars = [];
    this.n = n;
    this.y = y; 
    this.space = random(SCL*(1 + 0.5), SCL*3.4);
  }
  
  init() {
    var i;  
    
    for(i = 0; i < this.n; i++) {
      
      var prevX = this.cars.length === 0 ? 0 : this.cars[i-1].getX1();
      var car = new Car(prevX - this.space, this.y);
      this.cars.push(car);

    }
  }
  
  reset() {
    var i;
    for(i = 0; i < this.cars.length; i++) {
      this.cars[i].reset();
    }
  }
  
  update() {
    var i;
    for(i = 0; i < this.cars.length; i++) {
      this.cars[i].update();
    }
  }
  
  show() {
    var i;
    for(i = 0; i < this.cars.length; i++) {
      this.cars[i].show();
    }
  }
}



class Lanes {
    constructor(n){
      this.lanes = [];
      this.n = n;
    }
  
  init(){
    var i;
     for(i = 0; i < this.n; i++) {
      this.lanes[i] =  new CarLane(380 - (i*SCL*2.7 ) , NUMBER_CARS);
     }
    for(i = 0; i < this.n; i++) {
      this.lanes[i].init();
     }
  }
  update(){
    var i;
    for(i = 0; i < this.n; i++) {
      this.lanes[i].update();
  
    }
  }
  
  show(){
    var i;
    for(i = 0; i < this.n; i++) {
      this.lanes[i].show();
      
    }
  }
  reset(){
    var i;
     for(i = 0; i < this.n; i++) {
      this.lanes[i].reset();
    }
  }
  
}


