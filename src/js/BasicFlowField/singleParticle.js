let noiseFloat;

class singleParticle {
  constructor(h, weight) {
    this.pos = createVector(random(width), random(height));
    this.pPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 1.5;
    this.weight = weight;
    this.lifeTime = int(random(300, 1000));
    this.age = 0;
    this.dead = false;
    this.hue = h;
  }

  update() {
    noiseFloat = noise(this.pos.x * 0.0005, this.pos.y * 0.0005);
    this.acc.x = cos(noiseFloat * TWO_PI * noiseFloat * 6);
    this.acc.y = sin(noiseFloat * TWO_PI * noiseFloat * 6);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // this.acc.mult(0);
    this.age++;
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    let lifeRatio = this.age / this.lifeTime;
    // let hue = floor(random(50, 80));
    let sat = map(this.acc.x, -1, 1, 40, 80);
    let bright = map(this.acc.y, -1, 1, 40, 80);

    // stroke(h,s,b, (1-lifeRatio)*255);
    stroke(this.hue, sat, bright, (1 - lifeRatio) * 255);
    strokeWeight(lifeRatio * this.weight);
    line(this.pos.x, this.pos.y, this.pPos.x, this.pPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.pPos.x = this.pos.x;
    this.pPos.y = this.pos.y;
  }

  edges() {
    if (this.age >= this.lifeTime) this.dead = true;

    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }

    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}

export default singleParticle;
