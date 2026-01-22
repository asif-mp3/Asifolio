export const cloudVertexShader = `
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const cloudFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorPurple;
  uniform vec3 uColorCyan;
  uniform float uOpacity;
  uniform float uShellIndex;
  uniform float uTotalShells;

  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec2 vUv;

  // Simple noise function (no texture needed)
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    // Calculate view direction for fresnel
    vec3 viewDir = normalize(cameraPosition - vPosition);

    // Fresnel effect for edge glow
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);

    // Animated noise for cloud effect
    vec2 animatedUv = vUv * 3.0 + vec2(uTime * 0.02, uTime * 0.015);
    float noiseValue = fbm(animatedUv);

    // Second layer of noise for more detail
    vec2 animatedUv2 = vUv * 5.0 - vec2(uTime * 0.015, uTime * 0.02);
    float noiseValue2 = fbm(animatedUv2);

    float combinedNoise = noiseValue * 0.6 + noiseValue2 * 0.4;

    // Color gradient based on position and noise
    float colorMix = combinedNoise + vPosition.y * 0.2 + 0.5;
    colorMix = clamp(colorMix, 0.0, 1.0);
    vec3 cloudColor = mix(uColorPurple, uColorCyan, colorMix);

    // Shell-based opacity (inner shells are more transparent)
    float shellFactor = uShellIndex / uTotalShells;
    float baseOpacity = uOpacity * (0.3 + shellFactor * 0.4);

    // Final opacity with fresnel and noise
    float finalOpacity = baseOpacity * (0.4 + fresnel * 0.6) * (0.5 + combinedNoise * 0.5);

    // Add subtle glow at edges
    cloudColor += fresnel * uColorPurple * 0.3;

    gl_FragColor = vec4(cloudColor, finalOpacity);
  }
`;

// Node glow shader for project markers
export const nodeVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nodeFragmentShader = `
  uniform vec3 uColor;
  uniform float uGlowIntensity;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.0);

    // Pulsing glow effect
    float pulse = 0.8 + 0.2 * sin(uTime * 3.0);

    // Core color with glow
    vec3 finalColor = uColor + fresnel * uColor * uGlowIntensity * pulse;

    // Opacity based on glow intensity
    float opacity = 0.8 + fresnel * 0.2 * uGlowIntensity;

    gl_FragColor = vec4(finalColor, opacity);
  }
`;
