//https://www.shadertoy.com/view/ll2GRD

const vertexshader = `
// attribute vec3 position;//need for p5
// attribute vec2 iTexCoord;

// // lets get texcoords just for fun! 
// varying vec2 oTexCoord;

// void main() {
//      // copy the texcoords
//     oTexCoord = iTexCoord;
//     gl_Position = vec4(position, 1.0 );
// }
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun! 
varying vec2 oTexCoord;

void main() {
  // copy the texcoords
  oTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;





const fragmentshader = `
precision mediump float;

// lets grab texcoords just for fun
varying vec2 oTexCoord;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;


void main() {
    float intensity=1.0;
    // vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st = oTexCoord;
    vec2 p =3.0*(st-vec2(0.5));//-vec2(u_mouse.x*0.0005,-u_mouse.y*.001)

    float cLength=length(p);
    vec2 vUv=st*-1.0+(p/cLength)*cos(cLength*10.0-u_time*5.0)*intensity;
    vec3 col=smoothstep(0.1,0.9,texture2D(u_texture, vUv).xyz);
    gl_FragColor = vec4(col, 0.9);
}
`;

export { vertexshader, fragmentshader };
