import canvasSketch from "canvas-sketch";
import p5 from "p5";
import SingleLine from "./singleLine.js";

new p5();

const settings = {
  dimensions: [1024, 1024],
  p5: true,
  animate: true,
  duration: 15,
  attributes: {
    antialias: true,
  },
};

let shortTotalLine = 24;
let shortlines = [];

let longTotalLine = 6;
let longlines = [];

const sketch = () => {
  background(255);

  for (let i = 0; i < shortTotalLine; i++) {
    let ratio = i / shortTotalLine;
    let startPos = createVector(random(-80, 80), random(-30, 30));
    let length = random(100, 360);
    let weight = random(8, 16);
    shortlines[i] = new SingleLine(
      -0.6 * PI * ratio - 0.1 * PI,
      startPos,
      length,
      weight
    );
  }

  for (let i = 0; i < longTotalLine; i++) {
    let startPos = createVector(random(-60, 60), random(-30, 30));
    let length = random(450, 800);
    let weight = random(15, 32);
    let iniRotate = random(-0.3, -0.6) * PI;
    longlines[i] = new SingleLine(iniRotate, startPos, length, weight);
  }

  return ({ context, width, height }) => {
    push();
    translate(width / 2, height * 0.9);

    //one line
    if (shortlines.length > 0) {
      for (let i = shortlines.length - 1; i >= 0; i--) {
        if (!shortlines[i].stop) {
          shortlines[i].update();
          shortlines[i].draw();
          shortlines[i].checkStep();
        }
      }
    }

    if (longlines.length > 0) {
      for (let i = longlines.length - 1; i >= 0; i--) {
        if (!longlines[i].stop) {
          longlines[i].update();
          longlines[i].draw();
          longlines[i].checkStep();
        }
      }
    }

    pop();
  };
};

canvasSketch(sketch, settings);
