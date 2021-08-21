#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
    return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
vec4 effect(vec4 color, Image texture, vec2 texture_coords, vec2 screen_coords) {
    vec2 p = texture_coords - 0.5;
    float r = sqrt(dot(p, p));
    return mix(color, vec4(0.), r);
}
#endif