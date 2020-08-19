//https://www.shadertoy.com/view/Xsd3DB

const vertexshader = `
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
uniform sampler2D u_texture;
uniform sampler2D bufferA;
uniform vec2 u_resolution;


#define TEXTURED 1

void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution;
  // uv = vec2(uv.x, 1.0-uv.y);
  // vec2 uv = vec2(oTexCoord.x, 1.0-oTexCoord.y);

#if TEXTURED == 1
    vec3 e = vec3(vec2(1.)/u_resolution,0.);
    float p10 = texture2D(u_texture, uv-e.zy).x;
    float p01 = texture2D(u_texture, uv-e.xz).x;
    float p21 = texture2D(u_texture, uv+e.xz).x;
    float p12 = texture2D(u_texture, uv+e.zy).x;
    
    // Totally fake displacement and shading:
    vec3 grad = normalize(vec3(p21 - p01, p12 - p10, 1.));
    vec4 c = texture2D(u_texture, uv*2.0 + grad.xy*.35);
    vec3 light = normalize(vec3(.2,-.5,.7));
    float diffuse = dot(grad,light);
    float spec = pow(max(0.,-reflect(light,grad).z),32.);
    gl_FragColor = mix(c,vec4(.7,.8,1.,1.),.25)*max(diffuse,0.) + spec;
    
#else
    
    float h = texture2D(u_texture, uv).x;
    float sh = 1.35 - h*2.;
    vec3 c =
       vec3(exp(pow(sh-.75,2.)*-10.),
            exp(pow(sh-.50,2.)*-20.),
            exp(pow(sh-.25,2.)*-10.));
    gl_FragColor = vec4(c,1.);

#endif
}
`;

export { vertexshader, fragmentshader };
