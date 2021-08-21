varying vec3 vFragPos;
varying vec3 vNormal;

uniform sampler2D tex1;
uniform float t;

#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
	vec4 pos = position * vec4(Texel(tex1, vUV * 2.).rgb * 0.75 + 0.5, 1.0);
	vFragPos = vec3(uView * uModel * pos);
	vNormal = mat3(uNormalMatrix) * normal;
	return transform_projection * pos;
}
#endif

#ifdef FRAGMENT
vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
	vec3 lightColor = vec3(1., 1., 1.);
	// vec3 lightPos = vec3(-1., -1., -1.);
	vec3 lightPos = vec3(0., 0., 0.);

	vec3 norm = normalize(vNormal);
	vec3 lightDir = normalize(lightPos - vFragPos);  
	float diff = max(dot(norm, lightDir), 0.);
	vec3 diffuse = diff * lightColor;// + color.xyz;
	
	vec4 t1 = Texel(texture, st);
	vec4 t2 = Texel(tex1, st * 2.);
	vec3 c = t1.rgb * t2.rgb * diffuse;

	return vec4(c, 1.);
}
#endif