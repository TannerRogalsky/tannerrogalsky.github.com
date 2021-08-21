#ifdef VERTEX

vec4 pos(mat4 transform_projection, vec4 vertex_position) {
	return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT

vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
    float d = 1.0 - (length(st - 0.5) * 2.);
    d = smoothstep(0.0, 0.5, d);
	return vec4(color.rgb, d);
}
#endif