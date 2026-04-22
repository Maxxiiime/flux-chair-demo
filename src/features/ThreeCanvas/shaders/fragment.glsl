// ============================================
// FRAGMENT SHADER
// ============================================

// Mode identifier
uniform float uMode;

// Diffuse textures for transition
uniform sampler2D uDiffuseMap1;  
uniform sampler2D uDiffuseMap2; 

// Transition controls
uniform float uProgress;         
uniform float uAnimationStyle;   
uniform float uSmoothness;      

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uHasDiffuseMap1; 
uniform float uHasDiffuseMap2;

// Material properties       
uniform vec2 uRepeat1;
uniform vec2 uRepeat2;
uniform float uRoughness; 
uniform float uBoundsMinY;
uniform float uBoundsMaxY;

// Mode 1 (Velvet) - Normal maps
uniform sampler2D uNormalMap1;
uniform sampler2D uNormalMap2;
uniform float uHasNormalMap;
uniform vec2 uNormalScale;

// Mode 3 (Legs) - Roughness maps
uniform sampler2D uRoughnessMap1;
uniform sampler2D uRoughnessMap2;
uniform float uMetalness;

// Varyings from vertex shader
varying vec2 vCsmUv;
varying vec3 vLocalPosition;
varying vec3 vWorldPosition; 
varying mat3 vTBN; 

vec3 sampleNormal(sampler2D normalMap, vec2 uv, vec2 scale) {
  vec3 n = texture2D(normalMap, uv).xyz * 2.0 - 1.0;
  n.xy *= scale;
  return normalize(vTBN * n);
}

void main() {
  vec2 repeatedUv1 = vCsmUv * uRepeat1;
  vec2 repeatedUv2 = vCsmUv * uRepeat2;
  
  vec4 diffuse1 = (uHasDiffuseMap1 > 0.5) ? texture2D(uDiffuseMap1, repeatedUv1) : vec4(uColor1, 1.0);
  vec4 diffuse2 = (uHasDiffuseMap2 > 0.5) ? texture2D(uDiffuseMap2, repeatedUv2) : vec4(uColor2, 1.0);

  float topAlpha = diffuse1.a;
  float yRange = max(uBoundsMaxY - uBoundsMinY, 0.00001);
  float normalizedY = clamp((vLocalPosition.y - uBoundsMinY) / yRange, 0.0, 1.0);
  float transitionMask = smoothstep(normalizedY - uSmoothness, normalizedY + uSmoothness, uProgress);
  
  vec3 finalColor = mix(diffuse1.rgb, diffuse2.rgb, transitionMask);

  // ============================================
  // MODE 0: TOP REGULAR MATERIAL
  // ============================================
  if (uMode < 0.5) {
    csm_DiffuseColor = vec4(finalColor, 1.0);
    csm_Roughness = uRoughness;
    csm_Metalness = uMetalness;
  }
 // ============================================
  // MODE 1: TOP VELVET MATERIAL
  // ============================================
  else if (uMode < 1.5) {
   csm_DiffuseColor = vec4(finalColor, 1.0);
   csm_Roughness = uRoughness;
   csm_Metalness = uMetalness;

  if (uHasNormalMap > 0.5) {
    vec3 n1 = sampleNormal(uNormalMap1, repeatedUv1, uNormalScale);
    vec3 n2 = sampleNormal(uNormalMap2, repeatedUv2, uNormalScale);
    csm_FragNormal = normalize(mix(n1, n2, transitionMask));
  }

  }
   // ============================================
  // MODE 2: LEGS MATERIAL
  // ============================================
  else if (uMode > 1.5) {

    float yRange = max(uBoundsMaxY - uBoundsMinY, 0.00001);
    float normalizedY = clamp((vLocalPosition.y - uBoundsMinY) / yRange, 0.0, 1.0);
    float legsTransitionMask = smoothstep(normalizedY - uSmoothness, normalizedY + uSmoothness, uProgress);

    vec3 legsColor = mix(diffuse1.rgb, diffuse2.rgb, legsTransitionMask);

    vec4 roughness1 = texture2D(uRoughnessMap1, repeatedUv1);
    vec4 roughness2 = texture2D(uRoughnessMap2, repeatedUv2);
    float finalRoughness = mix(roughness1.r, roughness2.r, legsTransitionMask);
    finalRoughness = clamp(max(finalRoughness, uRoughness), 0.0, 1.0);

    csm_DiffuseColor = vec4(legsColor, 1.0);
    csm_Roughness = finalRoughness;
    csm_Metalness = uMetalness;
}
}
