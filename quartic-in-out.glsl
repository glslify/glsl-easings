float quarticInOut(float t) {
  if (t < 0.5) {
    return 8.0 * t * t * t * t;
  }
  float u = 1.0 - t;
  return 1.0 - 8.0 * u * u * u * u;
}

#pragma glslify: export(quarticInOut)
