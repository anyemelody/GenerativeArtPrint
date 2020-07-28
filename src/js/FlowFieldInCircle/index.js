import canvasSketch from "canvas-sketch";
import p5 from "p5";
import singleCircleParticle from "./singleCircleParticle";

new p5();
let particles = [];
let paperSize = 1024;

const settings = {
  // pixelsPerInch: 72,
  // units: 'in',
  // dimensions: "a1",
  dimensions: [paperSize, paperSize],
  // Tell canvas-sketch we're using p5.js
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  // We can specify WebGL context if we want
  // context: 'webgl',
  // Optional loop duration
  // duration: 6,
  // Enable MSAA
  attributes: {
    antialias: true,
  },
};

export const sketch = ({ width, height }) => {
  // Inside this is a bit like p5.js 'setup' function
  // ...
  background(0);

  for (let i = 0; i < paperSize * 2; i++) {
    particles[i] = new singleCircleParticle(paperSize * 0.5 * 0.7);
  }

  // Return a renderer to 'draw' the p5.js content
  return ({ context, width, height, playhead }) => {
    push();
    translate(width / 2, height / 2);

    if (particles.length > 0) {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        particles[i].edges();
        if (particles[i].dead) {
          particles.splice(i, 1);
        }
      }
    }

    pop();
  };
};

canvasSketch(sketch, settings);
