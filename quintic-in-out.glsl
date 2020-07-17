float quinticInOut(float t) {
  if (t < 0.5) {
    return 16.0 * t * t * t * t * t;
  }
  float u = 1.0 - t;
  return 1.0 - 16.0 * u * u * u * u * u;
}

#pragma glslify: export(quinticInOut)
