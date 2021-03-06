//https://www.shadertoy.com/view/ll2GRD

const vertexshader = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

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
uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;


void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution;
  uv = vec2(uv.x, 1.0-uv.y);
  // vec2 uv = vec2(oTexCoord.x, 1.0-oTexCoord.y);
  float intensity = 1.2;
	uv.y += ((cos((uv.y + (u_time * 0.06)) * 45.0) * 0.003) +
		(cos((uv.y + (u_time * 0.08)) * 10.0) * 0.005))*intensity;
	uv.x += ((sin((uv.y + (u_time * 0.07)) * 35.0) * 0.004) +
		(sin((uv.y + (u_time * 0.1)) * 18.0) * 0.002))*intensity;

	vec4 texColor = texture2D(u_texture,uv);
	gl_FragColor = texColor;
}
`;

export { vertexshader, fragmentshader };
