class SingleLine {
  constructor(basicRotation, pos, steps, weight, graphic) {
    this.basicRotation = basicRotation;
    this.pos = pos;
    this.pPos = this.pos.copy();
    this.vel = graphic.createVector(0, 0);
    this.deltaRotateNoise = graphic.random(1);
    this.deltaRotate = 0;
    this.lineStep = 0;
    this.totalStep = steps;
    this.stop = false;
    this.strokeWeight = weight;
    this.deltastrokeNoise = graphic.random(1);
    if (this.totalStep > 400) {
      this.lineCurve = graphic.random(-PI * 1.5, PI * 1.5);
      this.rotateDir = Math.sign(this.lineCurve);
    } else {
      this.lineCurve = 0.5 * graphic.PI + this.basicRotation;
    }
  }

  update(graphic) {
    if (this.totalStep > 400) {
      //make the wave curve of the line
      this.lineCurve += 0.005 * (this.rotateDir * -1);
      this.deltaRotate = (this.lineCurve / this.totalStep) * this.lineStep;
      this.vel = graphic.createVector(
        graphic.cos(this.basicRotation + this.deltaRotate),
        graphic.sin(this.basicRotation + this.deltaRotate)
      );
    } else {
      this.deltaRotate = (this.lineCurve / this.totalStep) * this.lineStep;
      this.deltaRotateNoise += 0.006;
      let noiseRotate = graphic.noise(this.deltaRotateNoise) - 0.5;
      this.vel = graphic.createVector(
        graphic.cos(this.basicRotation + this.deltaRotate + noiseRotate),
        graphic.sin(this.basicRotation + this.deltaRotate + noiseRotate)
      );
    }
    this.pos.add(this.vel);
    this.lineStep++;
  }

  draw(graphic) {
    this.deltastrokeNoise += 0.01;
    let strokeAlpha = graphic.map(
      graphic.noise(this.deltastrokeNoise),
      0,
      1,
      150,
      250
    );
    // graphic.colorMode(RGB, 255, 255, 255, 100);
    graphic.stroke(8, strokeAlpha);

    graphic.strokeWeight(
      graphic.map(this.lineStep / this.totalStep, 0, 1, this.strokeWeight, 0.1)
    );
    graphic.strokeWeight(
      graphic.map(this.lineStep / this.totalStep, 0, 1, this.strokeWeight, 0.1)
    ); //abs(sin(0.5*PI*this.lineStep/this.totalStep))
    graphic.line(this.pPos.x, this.pPos.y, this.pos.x, this.pos.y);
    this.pPos = this.pos.copy();
  }

  checkStep(graphic) {
    if (this.lineStep >= this.totalStep) {
      this.stop = true;
    }
  }
}

export default SingleLine;
