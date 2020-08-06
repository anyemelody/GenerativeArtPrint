class SingleLine {
  constructor(basicRotation, pos, steps, weight) {
    this.basicRotation = basicRotation;
    this.pos = pos;
    this.pPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.deltaRotateNoise = random(1);
    this.deltaRotate = 0;
    this.lineStep = 0;
    this.totalStep = steps;
    this.stop = false;
    this.strokeWeight = weight;
    this.deltastrokeNoise = random(1);
    if (this.totalStep > 400) {
      this.lineCurve = random(-PI * 1.5, PI * 1.5);
      this.rotateDir = Math.sign(this.lineCurve);
    } else {
      this.lineCurve = 0.5 * PI + this.basicRotation;
    }
  }

  update() {
    if (this.totalStep > 400) {
      //make the wave curve of the line
      this.lineCurve += 0.005 * (this.rotateDir * -1);
      this.deltaRotate = (this.lineCurve / this.totalStep) * this.lineStep;
      this.vel = createVector(
        cos(this.basicRotation + this.deltaRotate),
        sin(this.basicRotation + this.deltaRotate)
      );
    } else {
      this.deltaRotate = (this.lineCurve / this.totalStep) * this.lineStep;
      this.deltaRotateNoise += 0.006;
      let noiseRotate = noise(this.deltaRotateNoise) - 0.5;
      this.vel = createVector(
        cos(this.basicRotation + this.deltaRotate + noiseRotate),
        sin(this.basicRotation + this.deltaRotate + noiseRotate)
      );
    }
    this.pos.add(this.vel);
    this.lineStep++;
  }

  draw() {
    this.deltastrokeNoise += 0.01;
    let strokeAlpha = map(noise(this.deltastrokeNoise), 0, 1, 10, 50);
    stroke(0, strokeAlpha);

    strokeWeight(
      map(this.lineStep / this.totalStep, 0, 1, this.strokeWeight, 0.1)
    );
    strokeWeight(
      map(this.lineStep / this.totalStep, 0, 1, this.strokeWeight, 0.1)
    ); //abs(sin(0.5*PI*this.lineStep/this.totalStep))
    line(this.pPos.x, this.pPos.y, this.pos.x, this.pos.y);
    this.pPos = this.pos.copy();
  }

  checkStep() {
    if (this.lineStep >= this.totalStep) {
      this.stop = true;
    }
  }
}

export default SingleLine;
