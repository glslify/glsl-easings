float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 1. - 4.0 * pow(1. - t, 3.0);
}

#pragma glslify: export(cubicInOut)
