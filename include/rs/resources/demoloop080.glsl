varying vec3 vFragPos;
varying vec3 vNormal;

#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
	vFragPos = vec3(uModel * position);
	vNormal = mat3(uNormalMatrix) * normal;
	return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
uniform vec3 lightPos;

vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
	vec3 lightColor = vec3(0.1, 0.1, 0.1);

	vec3 norm = normalize(vNormal);
	vec3 lightDir = normalize(lightPos - vFragPos);  
	float diff = max(dot(norm, lightDir), 0.);
	vec3 diffuse = diff * lightColor + color.xyz;

	vec3 c = diffuse * Texel(texture, st).xyz;

	return vec4(c, 1.);
}
#endif