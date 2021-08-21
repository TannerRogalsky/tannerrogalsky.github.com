varying vec3 vNormal;

#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
    vNormal = normal;
	return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
    vec3 norm = (normalize(vNormal) + 1.) / 2.;
    float shadow = clamp(1.5 - length(norm), 0., 1.);
	vec3 diffuse = shadow * color.rgb;

	return vec4(diffuse, 1.0);
}
#endif