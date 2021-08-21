varying vec3 vNormal;

#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
	return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
uniform float t;

vec2 radialDistortion(vec2 coord, float dist) {
	float radialScale = 1.0;
	float radialBreathingScale = 0.0;

	vec2 cc = coord - 0.5;
	dist = dot(cc, cc * radialScale) * dist;
	dist += cos(t * 6.28) * radialBreathingScale;
	return (coord + cc * (1.0 + dist) * dist);
}


vec4 effect(vec4 color, Image tex, vec2 uv, vec2 screen_coords) {
	vec2 uv_r = uv, uv_g = uv, uv_b = uv;

	float offset = 0.01;
	float cellSize = 128.0;

	uv_r = radialDistortion(uv_r, .24)  + vec2(offset, 0.0);
	uv_g = radialDistortion(uv_g, .20);
	uv_b = radialDistortion(uv_b, .16) - vec2(0.0, offset);
	vec4 res = vec4(Texel(tex, uv_r).r, Texel(tex, uv_g).g, Texel(tex, uv_b).b, 1.0);
	res = res 
		- cos(uv_g.y * cellSize * 3.142 * 2.0) * .01
		- sin(uv_g.x * cellSize * 3.142 * 2.0) * .01;

	return res;
}
#endif