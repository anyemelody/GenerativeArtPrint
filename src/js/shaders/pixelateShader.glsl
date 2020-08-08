//https://www.shadertoy.com/view/ll2GRD

const vertexshader = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun! 
varying vec2 vTexCoord;

void main() {
  // copy the texcoords
  vTexCoord = aTexCoord;

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}`;

const fragmentshader = `
precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

void main() {

  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // to pixelate an image we need to alter our uvs so that instead of being a smooth gradient it steps from one color to the next
  // in order to do this we will use the floor function
  // floor will round a float down to the nearest int, so 4.98 would become 4.0, and -37.2 would become -37.0
  // first the uv's are multipled times a tiles variable
  float tiles = 20.0;
  uv = uv * tiles;
  // second the uvs are rounded down to the nearest int
  uv = floor(uv);
  // lastly we divide by tiles again so that uvs is between 0.0 - 1.0
  uv = uv / tiles;

  // often times in glsl you will see programmers combining many operation onto one line.
  // the previous three steps could have also been written as uv = floor( uv * tiles ) / tiles

  // get the webcam as a vec4 using texture2D and plug in our distored uv's
  vec4 tex = texture2D(tex0, uv);
  // output the texture
  gl_FragColor = tex;

  // if you'd like a debug view of what the uv's look like try running this line
  // gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
`;

export { vertexshader, fragmentshader };
