let noiseFloat;

class singleCircleParticle {
  constructor(circleRadius) {
    this.circleSize = circleRadius;
    this.radius = random(this.circleSize);
    this.theta = random(TWO_PI);
    this.pos = createVector(
      sin(this.theta) * this.radius,
      cos(this.theta) * this.radius
    );
    this.pPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 1.5;
    this.lifeTime = int(random(30, 200));
    this.age = 0;
    this.dead = false;
    this.hue = floor(random(50, 120));
  }

  update() {
    noiseFloat = noise(this.pos.x * 0.004, this.pos.y * 0.004);
    this.acc.x = cos(noiseFloat * TWO_PI * noiseFloat * 5);
    this.acc.y = sin(noiseFloat * TWO_PI * noiseFloat * 5);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // this.acc.mult(0);
    this.age++;
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    let lifeRatio = this.age / this.lifeTime;
    let sat = map(this.acc.x, -1, 1, 40, 90);
    let bright = map(this.acc.y, -1, 1, 40, 90);

    noFill();
    stroke(this.hue, sat, bright, (1 - lifeRatio) * 255);
    strokeWeight(lifeRatio * 2);
    line(this.pos.x, this.pos.y, this.pPos.x, this.pPos.y);
    this.updatePrev();
    //outside circle boundry
    ellipse(0, 0, this.circleSize * 2, this.circleSize * 2);
  }

  updatePrev() {
    this.pPos.x = this.pos.x;
    this.pPos.y = this.pos.y;
  }

  edges() {
    if (this.age >= this.lifeTime) this.dead = true;

    if (sq(this.pos.x) + sq(this.pos.y) > sq(this.circleSize)) {
      this.dead = true;
    }
  }
}

export default singleCircleParticle;
