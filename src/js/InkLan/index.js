import canvasSketch from "canvas-sketch";
import p5 from "p5";
// import SingleLine from "./singleLine.js";
import SingleLine from "./singleLineGraphic";
import {
  vertexshader,
  fragmentshader,
} from "../shaders/simpleWaterShader.glsl";

new p5();

const settings = {
  dimensions: [1024, 1024],
  p5: true,
  animate: true,
  context: "webgl",
  attributes: {
    antialias: true,
  },
};

let shortTotalLine = 24;
let shortlines = [];

let longTotalLine = 6;
let longlines = [];

let waterShader, liveFrame;

const sketch = () => {
  liveFrame = createGraphics(1024, 1024, WEBGL);
  liveFrame.background(255);
  for (let i = 0; i < shortTotalLine; i++) {
    let ratio = i / shortTotalLine;
    let startPos = liveFrame.createVector(
      liveFrame.random(-80, 80),
      liveFrame.random(-30, 30)
    );
    let length = liveFrame.random(100, 360);
    let weight = liveFrame.random(8, 16);
    shortlines[i] = new SingleLine(
      -0.6 * liveFrame.PI * ratio - 0.1 * liveFrame.PI,
      startPos,
      length,
      weight,
      liveFrame
    );
  }

  for (let i = 0; i < longTotalLine; i++) {
    let startPos = liveFrame.createVector(
      liveFrame.random(-60, 60),
      liveFrame.random(-30, 30)
    );
    let length = liveFrame.random(450, 800);
    let weight = liveFrame.random(15, 32);
    let iniRotate = liveFrame.random(-0.3, -0.6) * PI;
    longlines[i] = new SingleLine(
      iniRotate,
      startPos,
      length,
      weight,
      liveFrame
    );
  }
  //define shader
  waterShader = createShader(vertexshader, fragmentshader);

  return ({ context, width, height }) => {
    liveFrame.push();

    liveFrame.translate(0, 400); //width / 2, height * 0.9

    //one line
    if (shortlines.length > 0) {
      for (let i = shortlines.length - 1; i >= 0; i--) {
        if (!shortlines[i].stop) {
          shortlines[i].update(liveFrame);
          shortlines[i].draw(liveFrame);
          shortlines[i].checkStep(liveFrame);
        }
      }
    }

    if (longlines.length > 0) {
      for (let i = longlines.length - 1; i >= 0; i--) {
        if (!longlines[i].stop) {
          longlines[i].update(liveFrame);
          longlines[i].draw(liveFrame);
          longlines[i].checkStep(liveFrame);
        }
      }
    }
    liveFrame.pop();
    //water effect shader
    shader(waterShader);
    waterShader.setUniform("u_time", frameCount * 0.01);
    waterShader.setUniform("u_texture", liveFrame);
    // loadImage("../../assets/images/testImg.png", (img) => {
    //   waterShader.setUniform("u_texture", img);
    //   //image(img, -512, -512);
    // });

    rect(-512, -512, 1024, 1024);
  };
};

canvasSketch(sketch, settings);
