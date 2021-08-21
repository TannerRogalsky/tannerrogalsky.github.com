varying vec3 vFragPos;

#ifdef VERTEX
uniform sampler2D tex0;

vec4 pos(mat4 transform_projection, vec4 vertex_position) {
	vec3 v = Texel(tex0, vUV).rgb;
	float d = length(v);
	vertex_position.z = d - 0.5;
	vFragPos = vec3(uModel * vertex_position);
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
	vec3 fdx = vec3( dFdx( vFragPos.x ), dFdx( vFragPos.y ), dFdx( vFragPos.z ) );
    vec3 fdy = vec3( dFdy( vFragPos.x ), dFdy( vFragPos.y ), dFdy( vFragPos.z ) );
    vec3 norm = normalize( cross( fdx, fdy ) );

    float x = cos((ratio + 0.4) * 6.28) * 1.;
    float z = sin(-(ratio + 0.4) * 6.28) * 1.;
	vec3 lightPos = vec3(x, z, 0.);
	// vec3 lightPos = vec3(x, 2., z);

	vec3 lightColor = hueShift((norm + 1.) / 2., 6.28 * ratio);

	vec3 lightDir = normalize(lightPos - vFragPos);  
	float diff = max(dot(norm, lightDir), 0.);
	vec3 diffuse = diff * lightColor;

	// vec3 c = Texel(texture, st).rgb;
	// return vec4(mix(diffuse, c, 0.5), 1.0);
	return vec4(diffuse, 1.0);
}
#endif