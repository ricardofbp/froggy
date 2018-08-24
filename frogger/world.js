class WorldElement {
  constructor(x, y, width, height, r, g, b) {
    this.width = width;
    this.height = height;
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + width;
    this.y2 = y + height;
    this.rgb = [r, g, b];
    console.log(this);
  }
  
  show() {
    push();
    fill(this.rgb[0], this.rgb[1], this.rgb[2]);
    stroke(40, 40, 40);
    rect(this.x1, this.y1, this.width, this.height);
    pop();
  }
  
  getX1() {return this.x1;}
  getX2() {return this.x2;}
  getY1() {return this.y1;}
  getY2() {return this.y2;}
  
}

class World {
  constructor() {
    this.totalGridUnits = HEIGHT/SCL; 
    
    this.endZone = new WorldElement(0, 0, WIDTH, SCL, 0, 170 , 0);
    
    this.river = new WorldElement(0, SCL, WIDTH, SCL*Math.floor(this.totalGridUnits*0.35), 50, 70, 180);
    
    this.midSafeZone = new WorldElement(0, SCL*Math.floor(this.totalGridUnits*0.4), WIDTH, SCL, 0, 170, 0);
    
    this.road = new WorldElement(0, SCL*Math.floor(this.totalGridUnits*0.4) + SCL, WIDTH, SCL*Math.floor(this.totalGridUnits*0.4) + SCL, 60, 60, 60);
    
    this.startSafeZone = new WorldElement(0, HEIGHT-SCL, WIDTH, HEIGHT, 0, 170, 0);
  }
  
  show() {
    this.endZone.show();
    this.river.show();
    this.midSafeZone.show();
    this.road.show();
    this.startSafeZone.show();
  }
  
}