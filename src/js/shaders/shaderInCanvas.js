import canvasSketch from "canvas-sketch";
import p5 from "p5";
// import { vertexshader, fragmentshader } from "./pixelateShader.glsl";
import { vertexshader, fragmentshader } from "./simpleWaterShader.glsl";

new p5();

const settings = {
  dimensions: [640, 800],
  p5: true,
  animate: true,
  context: "webgl",
  attributes: {
    antialias: true,
  },
};

let noiseX,
  noiseY,
  noiseZ = 0;
let R = 10;
let noiseIndex = 0;
let flowers = [];
let waterDropShader, pixelateShader, liveFrame;
let canvasWidth = settings.dimensions[0],
  canvasHeight = settings.dimensions[1];

const sketch = () => {
  liveFrame = createGraphics(canvasWidth, canvasHeight, WEBGL);
  liveFrame.background(72, 96, 118);
  liveFrame.fill(72, 96, 118);
  liveFrame.noStroke();
  for (let i = 0; i < 1; i++) {
    flowers[i] = new Flower(createVector(0, 0));
  }

  //create and initialize shader
  //pixelateShader = createShader(vertexshader, fragmentshader);
  waterDropShader = createShader(vertexshader, fragmentshader);

  return ({ context, width, height }) => {
    noiseIndex += 0.1;
    let alphaNoise = noise(noiseIndex);
    alphaNoise = liveFrame.map(alphaNoise, 0, 1, 10, 50);
    let colorNoise = liveFrame.map(noise(noiseIndex), 0, 1, 255, 200);
    liveFrame.fill(255, colorNoise, colorNoise, alphaNoise);
    liveFrame.stroke(200, 10, 10, alphaNoise); //255,138,180
    liveFrame.strokeWeight(3);
    for (let i = 0; i < 1; i++) {
      flowers[i].draw(liveFrame);
    }
    //pixelate shader
    // shader(pixelateShader);
    // pixelateShader.setUniform("tex0", liveFrame);
    //water effect shader
    shader(waterDropShader);
    waterDropShader.setUniform("u_time", frameCount * 0.01);
    // waterDropShader.setUniform("u_texture", liveFrame);
    loadImage("../../assets/images/testImg.png", (img) => {
      waterDropShader.setUniform("u_texture", img);
    });
    // rect gives us some geometry on the screen
    rect(-canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
  };
};

canvasSketch(sketch, settings);

function Flower(center) {
  this.center = center;
  this.noiseZDelta = random(0.005, 0.02);
  this.draw = function (graphic) {
    graphic.push();
    graphic.beginShape();
    graphic.translate(this.center.x, this.center.y);
    graphic.rotate(noiseZ);
    for (let i = 0; i < TWO_PI; i += 0.05) {
      let x = graphic.cos(i * 4) * graphic.cos(i);
      let y = graphic.cos(i * 4) * graphic.sin(i);
      // let x = sin(i);
      // let y = cos(i);
      noiseX = graphic.map(x, -1, 1, 0, 2);
      noiseY = graphic.map(y, -1, 1, 0, 2);
      let radius = graphic.map(
        graphic.noise(noiseX, noiseY, noiseZ),
        0,
        1,
        8 * R,
        24 * R
      );
      graphic.vertex(x * radius, y * radius);
    }
    noiseZ += this.noiseZDelta;
    if (R > 0) {
      R -= 0.02;
    } else {
      R = 0;
    }

    graphic.endShape();
    graphic.pop();
  };
}
