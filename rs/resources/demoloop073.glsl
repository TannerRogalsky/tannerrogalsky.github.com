#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
    return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
uniform sampler2D tex1;
uniform float t;

float noise(vec2 uv) {
    vec3 v = Texel(tex1, uv).rgb;
    float r = pow(sin(t * 3.14 * 1.), 2.0);
    return mix(mix(v.r, v.g, r), v.b, 1.0 - r);
}

vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
    vec4 c = (color * Texel(texture, texture_coords)).rrra;

//    mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
//    vec2 uv = texture_coords * 8.;
//    float f = 0.;
//    f += 0.5000 * noise(uv); uv = m*uv;
//    f += 0.2500 * noise(uv); uv = m*uv;
//    f += 0.1250 * noise(uv); uv = m*uv;
//    f += 0.0625 * noise(uv); uv = m*uv;

//    vec3 n = vec3(f);
    float noise = noise(texture_coords);
//    float f = smoothstep(0.0, 0.7, noise * noise * noise);
    float f = noise;
    vec4 n = vec4(f);
//    vec4 n = vec4(noise(texture_coords));
    return c * n;
}
#endif