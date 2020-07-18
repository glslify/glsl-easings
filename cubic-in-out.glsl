float cubicInOut(float t) {
  if (t < 0.5) {
    return 4.0 * t * t * t;
  }
  float u = 1.0 - t;
  return 1.0 - 4.0 * u * u * u;
}

#pragma glslify: export(cubicInOut)
