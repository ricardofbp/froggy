class Lilypad{ // this can be made with an abstract object class, the only diference is y , speed and size
   constructor(x, y, s) {
    this.size = SCL;
    this.width = SCL;
    this.height = SCL;
    this.x1 = x - this.width;
    this.y1 = y;
    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
    this.speed = s;
  }
  
  update() {
    
    if ((this.x1 >= (WIDTH + this.size) && this.speed > 0)  || (this.x1 <= (0 - this.size) && this.speed < 0 )) {
      this.reset();
    }

 
    this.x1 += this.speed;
    this.x2 += this.speed;


  }
  
  /*no need to reset y 'cus it is always the same*/
  reset() {
    if (this.speed > 0){
      this.x1 = 0 - this.size;
      this.x2 = this.x1 + this.size;
    }
    else{
      this.x1 = WIDTH + this.size;
      this.x2 = this.x1 + this.size;
    }
  }
  
  show() {
    fill(100, 0, 0);
    rect(this.x1, this.y1, this.size, this.size);
  }
  
  getX1() {return this.x1;}
}
  
class LilypadLane {
  
  constructor(y, n, s) {
    this.lilypads = [];
    this.n = n;
    this.y = y; 
    this.space = random(SCL*(1 + 0.5), SCL*3.4);
    this.speed = s;
  }
  
  init() {
  var i;  
  for(i = 0; i < this.n; i++) {
    if (this.speed > 0){
      var prevX = this.lilypads.length === 0 ? 0 : this.lilypads[i-1].getX1();
      var lilypad = new Lilypad(prevX - this.space, this.y , this.speed);
      this.lilypads.push(lilypad); 
    }
    else{
      var prevX = this.lilypads.length === 0 ? WIDTH : this.lilypads[i-1].getX1();
      var lilypad = new Lilypad(prevX + this.space, this.y , this.speed);
      this.lilypads.push(lilypad); 
    
    }
  }
}
  
  reset() {
    var i;
    for(i = 0; i < this.lilypads.length; i++) {
      this.lilypads[i].reset();
    }
  }
  
  update() {
    var i;
    for(i = 0; i < this.lilypads.length; i++) {
      this.lilypads[i].update();
    }
  }
  
  show() {
    var i;
    for(i = 0; i < this.lilypads.length; i++) {
      this.lilypads[i].show();
    }
  }
}


class LilypadLanes {
    constructor(n,s){
      this.lanes = [];
      this.n = n;
      this.speed = s;
    }
  
  init(){
    var i;
     for(i = 0; i < this.n; i++) {
      this.speed = -1*this.speed;
      this.lanes[i] =  new LilypadLane(150 - (i*SCL ) , 4 , this.speed);
       
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
  
  getLane(i) { return this.lanes[i]; }
}
