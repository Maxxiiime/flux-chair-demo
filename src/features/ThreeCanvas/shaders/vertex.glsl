varying vec2 vCsmUv;
varying vec3 vLocalPosition;
varying mat3 vTBN;

void main() {
  vCsmUv = uv;
  vLocalPosition = position;

  vec3 N = normalize(normalMatrix * normal); // normal
  vec3 T = normalize(normalMatrix * tangent.xyz); // tangent
  T = normalize(T - dot(T, N) * N);
  vec3 B = cross(N, T) * tangent.w; // bitangent

  vTBN = mat3(T, B, N);
}