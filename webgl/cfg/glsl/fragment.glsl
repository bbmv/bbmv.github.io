uniform sampler2D texture;
uniform sampler2D texture2;
uniform vec3 color;
varying vec2 vUv;

void main() {

    vec4 tc = vec4(color.r, color.g, color.b, 1.0 );
	vec4 tColor = texture2D( texture, vUv );
	vec4 tColor2 = texture2D( texture2, vUv );

    gl_FragColor = tColor * tColor2;
}