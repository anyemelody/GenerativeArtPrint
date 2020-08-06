//https://www.shadertoy.com/view/ll2GRD

const vertexshader = `
void main() {
    gl_Position = vec4( position, 1.0 );
}`;

const fragmentshader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_texture;


void main() {
    float intensity=0.9;
    
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 p =2.4*(st-vec2(0.5))-vec2(u_mouse.x*0.0005,-u_mouse.y*.001);

    float cLength=length(p);
    vec2 uv=st/-1.+(p/cLength)*cos(cLength*15.0-u_time*3.0)*intensity;
    vec3 col=smoothstep(0.1,0.8,texture2D(u_texture, uv).xyz);
    gl_FragColor = vec4(col, 0.8);
}
`;

export { vertexshader, fragmentshader };
