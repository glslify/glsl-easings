float quarticOut(float t) {
  float u = 1.0 - t;
  return 1.0 - u * u * u * u;
}

#pragma glslify: export(quarticOut)
