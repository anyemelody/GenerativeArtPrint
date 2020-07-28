import canvasSketch from "canvas-sketch";
import p5 from "p5";
import { Branch } from "./branch.js";

new p5();

const settings = {
  dimensions: [2048, 2048],
  p5: true,
  animate: true,
  attributes: {
    antialias: true,
  },
};

const sketch = () => {
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 100);
  // background(95, 4, 100);

  push();
  translate(width / 2, height * 0.95);
  let tree = new Branch(11);
  pop();
  loadImage("../../assets/images/circleFrame.png", (img) => {
    image(img, 0, 0);
  });
  return ({ context, width, height }) => {};
};

canvasSketch(sketch, settings);
