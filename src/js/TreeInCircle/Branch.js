import p5 from "p5";
import MeiFlower from "./MeiFlower.js";
let flowerPos = [];

function Branch(len) {
  let pos = createVector(0, 0);
  let pPos = pos.copy();
  let vel = createVector(0, 0);
  let diameter = 0;
  let branchPoints = []; //save branch points
  let level = 0.6; //branch loop level

  stroke(0, 250);
  noFill();

  for (let i = 0; i < len; i += 1) {
    diameter = len * 9 - i;
    strokeWeight(diameter);
    vel = createVector(random(-len * 8, len * 8), random(60 - len, 90 - len));
    pos.add(vel);
    branchPoints[i] = createVector(pos.x, -pos.y);
    flowerPos.push(branchPoints[i]);
    line(pPos.x, pPos.y, pos.x, -pos.y);
    pPos.x = pos.x;
    pPos.y = -pos.y;
  }

  if (len > level) {
    let branchNum = len / 3;
    for (let b = 0; b < branchNum; b++) {
      push();
      let translatePos =
        branchPoints[
          round(random(branchPoints.length * 0.1, branchPoints.length - 1))
        ];
      translate(translatePos.x, translatePos.y);
      rotate(PI * (b - branchNum / 2) * random(0.16, 0.32));
      Branch(len * 0.6);
      let FlowerPos = branchPoints[round(random(branchPoints.length - 1))];
      // for(let i=0; i<random(10, 30); i++){
      //   fill(random(60,140), random(140, 200),random(10,40),random(10));
      //   noStroke();
      //   let circlePos = p5.Vector.add(FlowerPos, createVector(random(-200,200),random(-200,200)));
      //   let radius = random(120, 240);
      //   ellipse(circlePos.x, circlePos.y,radius, radius);
      // }
      let flower = new MeiFlower(FlowerPos, random(0.15, 0.3));
      flower.drawFlower();

      pop();
    }
  }
}

// function Branch(len) {
//   let pos = createVector(0, 0);
//   let pPos = pos.copy();
//   let vel = createVector(0, 0);
//   let diameter = 0;
//   let branchPoints = []; //save branch points
//   let lenLimit = 4;//branch loop level

//   stroke(0);
//   noFill();
//   ///single branch
//   if (len > 5) {
//     let segment = round(random(5, 8));
//     for (let i = 0; i < segment; i += 1) {
//       // diameter = map(len, 7, 0.8, 80, 6);
//       diameter = len * 12 - i * 2;
//       colorMode(HSB, 360, 100, 100);
//       stroke(0, 0, 100);
//       // strokeCap(SQUARE);
//       // strokeJoin(ROUND);
//       strokeWeight(diameter);
//       // vel = createVector(len * random(-10, 10), random(60, 80));
//       vel = createVector(random(-45, 45), random(60, 100));
//       pos.add(vel);
//       branchPoints[i] = createVector(pos.x, -pos.y);
//       // flowerPos.push(branchPoints[i]);
//       line(pPos.x, pPos.y, pos.x, -pos.y);
//       pPos.x = pos.x;
//       pPos.y = -pos.y;
//     }
//   }
//   else if (len <= 5 && len > 3) {
//     let segment = round(random(5, 8));
//     for (let i = 0; i < segment; i += 1) {
//       // diameter = map(len, 7, 0.8, 80, 6);
//       diameter = len * 8- i * 3;
//       colorMode(HSB, 360, 100, 100);
//       stroke(0, 0, 80);
//       // strokeCap(ROUND);
//       // strokeJoin(ROUND);
//       strokeWeight(diameter);
//       // vel = createVector(len * random(-10, 10), random(60, 80));
//       vel = createVector(random(-15,15)*len, random(80, 100));
//       pos.add(vel);
//       branchPoints[i] = createVector(pos.x, -pos.y);
//       // flowerPos.push(branchPoints[i]);
//       line(pPos.x, pPos.y, pos.x, -pos.y);
//       pPos.x = pos.x;
//       pPos.y = -pos.y;
//     }
//   } else {
//     let segment = round(random(1,3));
//     for (let i = 0; i < segment; i += 1) {
//       // diameter = map(len, 7, 0.8, 80, 6);
//       diameter = len * 7 - i * 4;
//       colorMode(HSB, 360, 100, 100);
//       stroke(0, 0, 100);
//       // strokeCap(SQUARE);
//       // strokeJoin(ROUND);
//       strokeWeight(diameter);
//       // vel = createVector(len * random(-10, 10), random(60, 80));
//       vel = createVector(random(-20, 20), random(30, 50));
//       pos.add(vel);
//       branchPoints[i] = createVector(pos.x, -pos.y);
//       // flowerPos.push(branchPoints[i]);
//       line(pPos.x, pPos.y, pos.x, -pos.y);
//       pPos.x = pos.x;
//       pPos.y = -pos.y;
//     }

//   }

//   // for (let i = 0; i < segment; i += 1) {
//   //   // diameter = map(len, 7, 0.8, 80, 6);
//   //   diameter = len * 9 -i*2;
//   //   colorMode(HSB,360, 100, 100);
//   //   stroke (0, 0, 100);
//   //   // strokeCap(SQUARE);
//   //   // strokeJoin(ROUND);
//   //   strokeWeight(diameter);
//   //   // vel = createVector(len * random(-10, 10), random(60, 80));
//   //   if (len > 5) {
//   //     vel = createVector(random(-60, 60), random(80, 100));
//   //   } else {
//   //     vel = createVector(random(-30, 30), random(12, 24)*i);
//   //   }

//   //   pos.add(vel);
//   //   branchPoints[i] = createVector(pos.x, -pos.y);
//   //   // flowerPos.push(branchPoints[i]);
//   //   line(pPos.x, pPos.y, pos.x, -pos.y);
//   //   pPos.x = pos.x;
//   //   pPos.y = -pos.y;
//   // }

//   if (len > lenLimit) {
//     let sign = 1;
//     let branchNum = len / 3;
//     if (len > 5) {
//       branchNum = random(2, 3);
//     } else if (len <= 5 && len > 3) {
//       branchNum = random(2);
//     } else {
//       branchNum = random(1, 4);
//     }
//     for (let b = 0; b < branchNum; b++) {
//       push();
//       //choose the branch node
//       let translatePos = branchPoints[floor(random(branchPoints.length - 1))];
//       //let translatePos = branchPoints[branchPoints.length - 1].mult(0.8);
//       translate(translatePos.x, translatePos.y);
//       flowerPos.push(translatePos);
//       sign *= -1;
//       //branch rotate angle
//       if (len > 5) {
//         rotate(random(0.06, 0.12) * sign * len);
//       } else if (len <= 5 && len > 3) {
//         rotate(random(0.1, 0.2) * sign * len);
//       } else {
//         rotate(random(0.2, 0.3) * sign * len);
//       }

//       Branch(len*0.7);
//       let flowerP = branchPoints[branchPoints.length - 1];
//       // flowers
//       let flower = new MeiFlower(flowerP, random(0.05, 0.3));
//       flower.drawFlower();
//       pop();
//     }
//   }

//   // if (len > level) {
//   //   let branchNum = len / 3;
//   //   for (let b = 0; b < branchNum; b++) {
//   //     push();
//   //     let translatePos = branchPoints[round(random(branchPoints.length * 0.2, branchPoints.length - 1))];
//   //     translate(translatePos.x, translatePos.y);
//   //     rotate(PI * (b - branchNum / 2) * random(0.1, 0.4));
//   //     Branch(len * 0.6);
//   //     let FlowerPos = branchPoints[branchPoints.length - 1];
//   //     //bubbles
//   //     for(let i=0; i<random(10, 30); i++){
//   //       fill(random(60,140), random(140, 200),random(10,40),random(10));
//   //       noStroke();
//   //       let circlePos = p5.Vector.add(FlowerPos, createVector(random(-200,200),random(-200,200)));
//   //       let radius = random(120, 240);
//   //       ellipse(circlePos.x, circlePos.y,radius, radius);
//   //     }
//   //     // flowers
//   //     let flower = new MeiFlower(FlowerPos, random(0.1, 0.3));
//   //     flower.drawFlower();

//   //     pop();
//   //   }
//   // }

// }

export { Branch, flowerPos };
