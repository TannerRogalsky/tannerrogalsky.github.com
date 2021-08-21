varying vec4 vColor;

uniform vec4 screenSize;
uniform float time;

#ifdef VERTEX
attribute vec4 position;
attribute vec4 color;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

void main() {
    vColor = color;
    gl_Position = projection * view * model * position;
}
#endif

#ifdef FRAGMENT
uniform sampler2D tex0;
uniform vec4 uColor;

void main() {
    float ratio = fract(time / 10.0);
    vec4 first_noise = Texel(tex0, gl_FragCoord.xy / 512.);
    vec4 noise = Texel(tex0, first_noise.xy + first_noise.z + ratio);
    vec4 color = vColor * uColor;
    float r = fract(noise.b + ratio) * 6.28;
    color.a = 1.0 - smoothstep(noise.r, noise.g, sin(r) * sin(r)) / 2.0;
    fragColor = color;
}
#endif