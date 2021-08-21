varying vec3 vFragPos;
varying vec3 vNormal;

#ifdef VERTEX
vec4 pos(mat4 transform_projection, vec4 vertex_position) {
    vFragPos = vec3(uModel * position);
    // vNormal = mat3(uNormalMatrix) * normal;
    vNormal = normalize(vec3(vec4(normal, 0.0) * uNormalMatrix));
    return transform_projection * vertex_position;
}
#endif

#ifdef FRAGMENT
uniform float ratio;
uniform vec4 bgColor;
uniform vec3 lightPos;

vec4 effect(vec4 color, Image texture, vec2 st, vec2 screen_coords) {
    vec3 fdx = vec3( dFdx( vFragPos.x ), dFdx( vFragPos.y ), dFdx( vFragPos.z ) );
    vec3 fdy = vec3( dFdy( vFragPos.x ), dFdy( vFragPos.y ), dFdy( vFragPos.z ) );
    vec3 norm = normalize( cross( fdx, fdy ) );

    // vec3 norm = normalize(vNormal);
    float dist = 1. / distance(lightPos, vFragPos);
    // dist *= dist;
    vec3 lightDir = normalize(lightPos - vFragPos);  
    float diff = max(dot(norm, lightDir), 0.);

    vec3 diffuse = min(diff * min(color.xyz * dist, vec3(1.)) + bgColor.rgb, vec3(1.));

    vec3 c = diffuse * Texel(texture, st).xyz;

    return vec4(c, 1.);
}
#endif