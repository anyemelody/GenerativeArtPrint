import canvasSketch from "canvas-sketch";
import p5 from "p5";
import palettes from "nice-color-palettes/1000.json";
import singleParticle from "./singleParticle";

new p5();
let palette;
let particles = [];

const settings = {
  // pixelsPerInch: 72,
  // units: 'in',
  // dimensions: "a1",
  dimensions: [5940, 8410],
  // Tell canvas-sketch we're using p5.js
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  // We can specify WebGL context if we want
  // context: 'webgl',
  // Optional loop duration
  // duration: 20,
  // Enable MSAA
  attributes: {
    antialias: true,
  },
};

export const sketch = ({ width, height }) => {
  let diaParameter = 5940;
  palette = random(palettes);
  background(0);

  for (let i = 0; i < Math.round(diaParameter / 2); i++) {
    let hue = floor(random(50, 100));
    particles[i] = new singleParticle(hue, Math.round(diaParameter / 240));
  }

  // Attach events to window to receive them
  // window.mouseClicked = () => {
  //   console.log('Mouse clicked');
  // };

  // Return a renderer to 'draw' the p5.js content
  return ({ context, width, height, playhead }) => {
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
    // else {
    //   console.log("finish");
    // }
  };
};

canvasSketch(sketch, settings);
