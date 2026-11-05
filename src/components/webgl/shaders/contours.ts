const glsl = String.raw;

export const vertex = glsl`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragment = glsl`
  precision highp float;

  uniform float uTime;
  uniform float uReveal;
  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform vec3  uInk;
  uniform vec3  uPaper;
  uniform vec3  uAccent;

  varying vec2 vUv;

  // 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x  = x_ * ns.x + ns.yyyy;
    vec4 y  = y_ * ns.x + ns.yyyy;
    vec4 h  = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  float fbm(vec3 p) {
    float a = 0.5, s = 0.0;
    for (int i = 0; i < 4; i++) { s += a * snoise(p); p *= 2.03; a *= 0.5; }
    return s;
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.035;

    // domain warp
    vec2 q = vec2(fbm(vec3(p * 0.9, t)), fbm(vec3(p * 0.9 + 4.7, t)));

    // pointer lifts the terrain locally
    float d = length(p - m);
    float lift = exp(-d * d * 7.0) * 0.32;

    float field = fbm(vec3(p * 1.25 + q * 0.75, t * 1.4)) + lift;

    // contour lines in band space, anti-aliased with derivatives
    float bands = field * 13.0;
    float w = fwidth(bands);
    float dist = abs(fract(bands - 0.5) - 0.5);
    float line = 1.0 - smoothstep(0.0, w * 1.25, dist);

    // every 5th contour is an index line, like on a survey map
    float idx = floor(bands + 0.5);
    float major = 1.0 - step(0.5, mod(idx, 5.0));
    float alpha = mix(0.13, 0.42, major);

    // reveal outward from the lower-left
    float r = length(vUv - vec2(0.15, 0.1));
    float reveal = 1.0 - smoothstep(uReveal * 1.6 - 0.35, uReveal * 1.6, r);

    // soft vignette
    float vig = 1.0 - smoothstep(0.25, 1.25, length(p * vec2(0.8, 1.1)));

    vec3 col = uInk;
    col = mix(col, uPaper, line * alpha * vig * reveal);
    col = mix(col, uAccent, line * exp(-d * d * 14.0) * 0.95 * reveal);

    col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.035;

    gl_FragColor = vec4(col, 1.0);
  }
`;
