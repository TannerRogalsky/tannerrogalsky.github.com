#define PI 3.14159265359
#define TWO_PI 6.28318530718

varying vec3 vFragPos;
varying vec3 vNormal;

#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
 	vFragPos = vec3(uModel * position);
    vNormal = normal;
    return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
	vec3 lightPos = vec3(0., 0., 64. * -8.);
	vec3 norm = normalize(vNormal);
	vec3 lightDir = normalize(lightPos - vFragPos);  
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuse = diff * color.xyz;

	vec3 c = diffuse * Texel(texture, st).xyz;

	return vec4(c, 1.0);
}
#endif