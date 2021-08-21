varying vec3 vFragPos;

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

vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
    vec3 c1 = vec3(1., 0.3, 0.3);
    vec3 c2 = vec3(0.4, 0.4, 0.6);
    float m = sin((ratio + 0.75) * 3.14 - st.x + 0.2);
    m = m * m;
    vec3 c = mix(c1, c2, m);

    c = mix(c, hueShift(c, m * 3.14), m);
    c = mix(c, vec3(0., 0., 0.), floor(st.y * 10.) / 10.);
	return vec4(c, 1.0);
}
#endif