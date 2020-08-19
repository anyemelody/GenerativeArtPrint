const { construct } = require("core-js/fn/reflect");

class LanFlower {
  constructor(x, y) {
    this.originX = x;
    this.originY = y;
    this.theta = random(-PI / 4, PI / 4);
    this.rootPos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 1;
    this.maxForce = 0.5;
    this.dis = 0;
    this.pointShift = random(-6, 6);
    this.r = random(100, 150);
    this.g = random(100, 180);
    this.b = random(50);
    this.scaleValue = random(0.8, 2.4);
    this.wind = createVector(0, 0);
    this.t1 = random(1);
    this.t2 = random(1);
  }

  run() {
    this.update();
    this.display();
  }

  display() {
    fill(this.r, this.g, this.b);
    noStroke();
    push();
    translate(this.rootPos.x, this.rootPos.y);
    scale(this.scaleValue);
    rotate(this.theta);
    beginShape();
    vertex(10 * sin(this.theta), 15 * cos(this.theta)); // begin at this point x, y
    // make the pointy end of the leaf vary on the x axis (so the leaf gets longer or shorter) AND vary the y axis of the control points by the same amount. It should be possible to have 'normal' leaves, very short fat ones and very long thin ones.
    bezierVertex(
      25 * sin(this.theta),
      25 * cos(this.theta),
      (15 - this.pointShift / 2) * sin(this.theta),
      (55 + this.pointShift) * cos(this.theta),
      5 * sin(this.theta),
      (55 + this.pointShift) * cos(this.theta)
    );
    bezierVertex(
      0 * sin(this.theta),
      (55 + this.pointShift) * cos(this.theta),
      -10 * sin(this.theta),
      25 * cos(this.theta),
      10 * sin(this.theta),
      15 * cos(this.theta)
    ); // draw the other half of the shape
    //the start point of leaf is (10,15), end point is (60+pointShift, 20)
    endShape();
    pop();
  }

  update() {
    /*add self movement to the rootPos*/
    this.t1 += 0.01;
    this.t2 += 0.01;
    var x = cos(this.t1);
    var y = sin(this.t2);
    x = map(x, -1, 1, -0.3, 0.3);
    y = map(y, -1, 1, -0.3, 0.3);
    this.wind = createVector(x, y);
    this.rootPos.add(this.wind);
    ///////////////////////////////////
    this.theta += this.acc.x * this.acc.y;
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  applyBehaviors(vehicles, desire) {
    var cohesionForce = this.cohesion(vehicles);
    var seekForce = this.seek(desire);
    this.applyForce(cohesionForce);
    this.applyForce(seekForce);
  }

  cohesion(vehicles2) {
    var neighbourist = 10;
    var sum = 0;
    var count = 0;
    for (var i = 0; i < vehicles2.length; i++) {
      var d = abs(this.theta - vehicles2[i].theta);
      if (d > 0 && d < neighbourist) {
        sum += vehicles2[i].theta;
        count++;
      }
    }
    if (count > 0) {
      sum = sum / count;
      var direction = 1;
      var w = abs(sum);
      if (sum < 0) {
        direction = -1;
      }
      var steerSum = createVector(direction, w);
      return this.seek(steerSum);
    } else {
      /*maybe have problem*/
      return createVector(0, 0);
    }
  }

  seek(target) {
    var desired = target.copy();
    var w = desired.mag();
    w = w / 50000;
    var direction = desired.x;
    if (direction < 0) {
      direction = 1;
    } else {
      direction = -1;
    }
    var steer = createVector(direction, w);
    steer.limit(this.maxForce);
    return steer;
  }
}

export default LanFlower;
