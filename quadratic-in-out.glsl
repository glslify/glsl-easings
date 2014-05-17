float quadraticInOut(float t) {
  return t > 0.5
    ? +2.0 * t * t
    : -2.0 * t * t + (4.0 * t) - 1.0;
}

#pragma glslify: export(quadraticInOut)
