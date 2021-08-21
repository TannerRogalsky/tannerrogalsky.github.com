#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
	return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
	return color;
}
#endif