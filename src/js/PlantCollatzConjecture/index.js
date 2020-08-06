import canvasSketch from "canvas-sketch";
import p5 from "p5";
import collatzConjecture from "./collatzConjecture";

new p5();

const settings = {
  dimensions: [2159, 2794],
  p5: true,
  // Turn on a render loop (it's off by default in canvas-sketch)
  animate: true,
  // We can specify WebGL context if we want
  // context: 'webgl',
  // Optional loop duration
  duration: 5,
  // Enable MSAA
  attributes: {
    antialias: true,
  },
};

let collatzArray = [];

const sketch = () => {
  background(0);
  let totalLine = 120;

  for (let i = 0; i < totalLine; i++) {
    // collatzArray.push (new collatzConjecture(i+1));
    // collatzArray[i].recordNum();
    // console.log(collatzArray[i].numList.length);
    // collatzArray.filter(item => (item.numList.length<10));
    let collatz = new collatzConjecture(floor(random(1000)));
    collatz.recordNum();
    if (collatz.numList.length < 60) {
      collatzArray.push(collatz);
    }
  }

  for (let i = 0; i < collatzArray.length; i++) {
    collatzArray[i].recordColor(i, collatzArray.length);
  }

  let deltaX = 0,
    deltaY = 0,
    deltaRotate = 0;

  return ({ context, width, height }) => {
    background(0);
    deltaX += 0.002;
    deltaY += 0.003;
    deltaRotate += 0.0012;

    for (let i = 0; i < collatzArray.length; i++) {
      // resetMatrix();
      push();

      translate(width / 4, height);
      rotate(PI * 0.06);
      // if (i > 0) {
      //   let n = collatzArray[i - 1].numList[0];
      //   if (n % 2 == 0) {
      //     rotate(1 * this.rotateAngle);
      //   }
      //   else {
      //     rotate(-1.2 * this.rotateAngle);
      //   }
      //   translate(0, -collatzArray[i - 1].segment);
      // }
      // translate(width / 2+(noise(deltaX)-0.5)*300, height/2+(noise(deltaY)-0.5)*300);
      // rotate(2*PI/(collatzArray.length)*i+deltaRotate);
      collatzArray[i].drawLine(i);
      pop();
    }
  };
};

canvasSketch(sketch, settings);
