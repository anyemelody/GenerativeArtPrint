import canvasSketch from "canvas-sketch";
import p5 from "p5";

new p5();

const settings = {
  dimensions: [8192, 4096],
  p5: true,
  animate: true,
  duration: 5,
  attributes: {
    antialias: true,
  },
};

let mist = new Mist();

const sketch = () => {
  setBackgroundGradient();
  mountains(height, 7);
  clouds();
  mist.setup();

  return ({ context, width, height }) => {
    // background (255,5);
    // mist.move();
  };
};

canvasSketch(sketch, settings);

function setBackgroundGradient() {
  let outC = color(40, 60, 60);
  let innerC = color(200, 230, 230);
  /* radius gradient*/
  // let radius = width*1.5;
  // for (let r=0; r<radius; r++) {
  //   noFill();
  //   stroke(lerpColor(innerC, outC, r/radius));
  //   ellipse(width/2, height/2, r, r*height/width);
  // }
  /* the linear gradient */
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height * 0.5, 0, 1);
    let c = lerpColor(outC, innerC, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function clouds() {
  let begin = random(1);
  let i = 0;
  for (let x = 0; x < width; x += 12) {
    let j = 0;
    for (let y = 0; y < height * 0.7; y += 8) {
      let alphaMax = map(y, 0, height * 0.7, 20, 0);
      let alpha = noise(begin + i, begin + j, y);
      alpha = map(alpha, 0.5, 1, 0, alphaMax);
      let c = map(alpha, 0, 1, 0, 100);
      noStroke();
      fill(c, alpha);
      let r = random(24, 64);
      circle(x, y, r);
      j += 0.03;
    }
    i += 0.02;
  }
}

function mountains(startHeight, mountainNum) {
  let y0 = startHeight;
  let i0 = 350;
  let cy = [];
  for (let j = 0; j < 10; j++) {
    cy[9 - j] = y0;
    y0 -= i0 / pow(1.06, j);
  }

  let dx = 0;
  for (let j = 2; j < mountainNum + 1; j++) {
    let amp = random(12, 64);
    let a = random(-width / 2, width / 2);
    let b = random(-width / 2, width / 2); //random discrepancy between the sin waves
    let c = random(2, 12); //random amplitude for the second sin wave
    let d = random(20, 100); //noise function amplitude
    let e = random(-width / 2, width / 2); //adds a discrepancy between the noise of each mountain

    for (let x = 0; x < width; x += 6) {
      let y = cy[j]; //y = reference y
      y += amp * j * sin((5 * dx) / j + a); //first sin wave oscillates according to j (the closer the mountain, the bigger the amplitude and smaller the frequency)
      y += c * j * sin((random(12, 72) * dx) / j + b); //second sin wave has a random medium amplitude (affects more the further mountains) and bigger frequenc
      y += d * j * noise((10 * dx) / j + e); //first noise function adds randomness to the mountains, amplitude depends on a random number and increases with j, frequency decrases with j
      // y += 1.7*j*noise(10*dx);  //second noise function simulates the canopy, it has high frequency and small amplitude depending on j so it is smoother on the further mountains

      strokeWeight(10); //mountains look smoother with stroke weight of 2
      colorMode(HSB, 360, 100, 100, 100);
      let cFurther = color(180, 5, 80);
      let cCloser = color(180, 40, 5);
      stroke(lerpColor(cFurther, cCloser, j / mountainNum));
      line(x, y, x, height);

      dx += 0.01;
    }
  }
}

function Mist() {
  this.posX = [];
  this.posY = [];
  this.accX = [];
  this.accY = [];
  this.noise = [];
  this.mistHeight = height * 0.5;
  this.radius = [];
  this.setup = function () {
    // //ADD MIST
    for (let i = 0; i < 50; i++) {
      this.posX[i] = floor(random(0, width));
      this.posY[i] = floor(random(this.mistHeight, height));
      this.radius[i] = floor(random(40, 80));
      let alpha = map(this.posY[i], this.mistHeight, height, 10, 80); //alfa is begins bigger for the further mountains
      strokeWeight(10); //interval of 3 for faster rendering
      noStroke();
      let cMist = color(360, 0, 100, alpha);
      fill(cMist);
      circle(this.posX[i], this.posY[i], this.radius[i]);
    }
  };

  this.move = function () {
    for (let i = 0; i < 50; i++) {
      this.noise[i] = noise(this.posX[i] * 0.003, this.posY[i] * 0.004);
      this.accX[i] = cos(this.noise[i] * TWO_PI * this.noise[i] * 10);
      this.accY[i] = sin(this.noise[i] * TWO_PI * this.noise[i] * 10);
      this.posX[i] += this.accX[i];
      this.posY[i] += this.accY[i];

      let alpha = map(i, 0, 50, 0, 1); //alfa is begins bigger for the further mountains
      strokeWeight(10); //interval of 3 for faster rendering
      let cMist = color(360, 0, 100, alpha);
      noStroke();
      fill(cMist);
      circle(this.posX[i], this.posY[i], this.radius[i]);
    }
  };
}
