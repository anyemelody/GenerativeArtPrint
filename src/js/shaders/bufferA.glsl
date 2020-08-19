//https://www.shadertoy.com/view/ll2GRD

const vertexAshader = `
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





const fragmentAshader = `
precision mediump float;

// lets grab texcoords just for fun
varying vec2 oTexCoord;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_frame;
uniform sampler2D u_texture;



void main() {
  vec3 e = vec3(vec2(1.)/u_resolution,0.);
   vec2 q = gl_FragCoord.xy/u_resolution;
   
   vec4 c = texture2D(u_texture, q);
   
   float p11 = c.y;
   
   float p10 = texture2D(u_texture, q-e.zy).x;
   float p01 = texture2D(u_texture, q-e.xz).x;
   float p21 = texture2D(u_texture, q+e.xz).x;
   float p12 = texture2D(u_texture, q+e.zy).x;
   
   float d = 0.;
    
   if (u_mouse.z > 0.) 
   {
      // Mouse interaction:
      d = smoothstep(4.5,.5,length(u_mouse.xy - gl_FragCoord.xy));
   }
   else
   {
      // Simulate rain drops
      float t = u_time*2.;
      vec2 pos = fract(floor(t)*vec2(0.456665,0.708618))*u_resolution;
      float amp = 1.-step(.05,fract(t));
      d = -amp*smoothstep(2.5,.5,length(pos - gl_FragCoord.xy));
   }

   // The actual propagation:
   d += -(p11-.5)*2. + (p10 + p01 + p21 + p12 - 2.);
   d *= .99; // dampening
   d *= float(u_frame>=2); // clear the buffer at iFrame < 2
   d = d*.5 + .5;
   
   // Put previous state as "y":
   gl_FragColor = vec4(d, c.x, 0, 0);
}
`;

export { vertexAshader, fragmentAshader };
