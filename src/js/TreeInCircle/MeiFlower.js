import p5 from "p5";

class MeiFlower {
  constructor(pos, flowerSize) {
    this.pos = pos;
    this.scale = flowerSize;
    this.petalNum = 5;
  }

  drawFlower() {
    translate(this.pos.x, this.pos.y);
    let k = random(1);
    if (k > 0.5) {
      this.petalNum = 5;
    } else {
      this.petalNum = 1;
    }

    for (let petal = 0; petal < this.petalNum; petal++) {
      //draw 5 petals
      let noiseMax = random(1, 2);
      push();
      let rotateAngle = (TWO_PI / 5) * petal;
      translate(
        (cos(rotateAngle) + random(-1, 1)) * 10 * this.scale,
        (sin(rotateAngle) + random(-1, 1)) * 10 * this.scale
      );
      rotate(rotateAngle);
      colorMode(HSB, 360, 100, 100, 100);
      // fill(random(340, 360), random(70,90),random(80,100),random(70,90));  //red
      fill(random(80, 90), random(60, 70), random(60, 80), random(40, 60));
      noStroke();
      beginShape();
      for (let i = 0; i < TWO_PI; i += 0.01) {
        //draw each petal
        let x = cos(1 * i) * cos(i * 1);
        let y = cos(1 * i) * sin(i * 1);
        let noiseX = map(x, -1, 1, 0, noiseMax);
        let noiseY = map(y, -1, 1, 0, noiseMax);
        let radius = map(
          noise(noiseX, noiseY),
          0,
          1,
          80 * this.scale,
          240 * this.scale
        );
        vertex(x * radius, y * radius);
      }
      endShape();
      pop();
    }
  }
}

export default MeiFlower;
