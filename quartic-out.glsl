float quarticOut(float t) {
  return pow(1.0 - t, 3.0) * (t - 1.0) + 1.0;
}

#pragma glslify: export(quarticOut)
