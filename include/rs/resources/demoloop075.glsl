#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
    return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
uniform float ratio;

vec3 hueShift( vec3 color, float hueAdjust ){

    const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
    const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);
    const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);

    const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);
    const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);
    const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);

    float   YPrime  = dot (color, kRGBToYPrime);
    float   I       = dot (color, kRGBToI);
    float   Q       = dot (color, kRGBToQ);
    float   hue     = atan (Q, I);
    float   chroma  = sqrt (I * I + Q * Q);

    hue += hueAdjust;

    Q = chroma * sin (hue);
    I = chroma * cos (hue);

    vec3    yIQ   = vec3 (YPrime, I, Q);

    return vec3( dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB) );

}

vec3 tx(vec3 c, float offset) {
	float phi = ratio * 6.28 + offset;

	c = c * 6.28;
	c = sin(c + phi);
	c *= c;

	return c;
}

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

vec2 radialDistortion(vec2 coord, float dist) {
    float radialScale = 1.0;
    float radialBreathingScale = 0.0;

    vec2 cc = coord - 0.5;
    dist = dot(cc, cc * radialScale) * dist;
    dist += cos(ratio * 6.28) * radialBreathingScale;
    return (coord + cc * (1.0 + dist) * dist);
}

#define HASHSCALE3 vec3(.1031, .1030, .0973)

vec2 hash2d(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
    p3 += dot(p3, p3.yzx+19.19);
    return fract((p3.xx+p3.yz)*p3.zy);
}

// vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
//     // st *= 16.0;
//     // vec2 uv_r = st, uv_g = st, uv_b = st;

//     // float offset = 0.01;
//     // float cellSize = 128.0;

//     // uv_r = radialDistortion(uv_r, .24)  + vec2(offset, 0.0);
//     // uv_g = radialDistortion(uv_g, .20);
//     // uv_b = radialDistortion(uv_b, .16) - vec2(0.0, offset);


//     // // vec3 c1 = Texel(texture, st).rgb;

//     // c = tx(c, 0.0);
//     // c = smoothstep(vec3(0.6), vec3(1.0), c);

//     // vec3 c = vec3(Texel(texture, uv_r).r, Texel(texture, uv_g).g, Texel(texture, uv_b).b);
//     // c = c 
//     //     - cos(uv_g.y * cellSize * 3.142 * 2.0) * .01
//     //     - sin(uv_g.x * cellSize * 3.142 * 2.0) * .01;

//     // vec3 c = vec3(0.0);
//         // vec2 CellUVs = floor(st + float(i * 1199));
//         // vec2 hash = (hash2d(CellUVs) * 2.0 - 1.0);
//     vec3 t = Texel(texture, st).rgb;
//     // vec2 hash = (t.rg * 2.0 - 1.0);
//     float hash_magnitude = 1.0 - length(t);

//     // vec2 hash = Texel(texture, st).rg;
//     // float hash_magnitude =(1.0-length(hash));

//     // vec2 UVgrid = fract(st * 16.) - 0.5;

//     //
//     float radius = clamp(hash_magnitude - 0.5, 0.0, 1.0);
//     float radialGradient = length(t * 2.0 - 1.0) / radius;
//     radialGradient = clamp(1.0 - radialGradient, 0.0, 1.0);
//     // radialGradient *= radialGradient;

//     vec3 c = vec3(hash_magnitude);

//     return vec4(c, 1.);
// }

vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
    // st *= 2.0;
    vec3 c1 = Texel(texture, st).rgb;
    vec2 st2 = (st * 2.0 + ratio);
    vec3 c2 = Texel(texture, st2).rgb;

    vec3 c = mix(c1, c2, 0.65);
    c = smoothstep(vec3(0.6), vec3(1.0), c);
    c *= 3.;

    float v = max(max(c.r, c.g), c.b);
    return vec4(vec3(v), 1.);
}
#endif