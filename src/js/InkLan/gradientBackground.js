export const setBackgroundGradient = (width, height, graphic) => {
  let outC = graphic.color(40, 60, 60);
  let innerC = graphic.color(200, 230, 230);
  /* radius gradient*/
  // let radius = width*1.5;
  // for (let r=0; r<radius; r++) {
  //   noFill();
  //   stroke(lerpColor(innerC, outC, r/radius));
  //   ellipse(width/2, height/2, r, r*height/width);
  // }
  /* the linear gradient */
  for (let i = -height / 2; i <= height / 2; i++) {
    let inter = graphic.map(i, -height / 2, height / 2, 0, 1);
    let c = graphic.lerpColor(outC, innerC, inter);
    graphic.stroke(c);
    graphic.line(-width / 2, i, width / 2, i);
  }
};
