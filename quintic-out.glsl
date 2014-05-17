float qinticOut(float t) {
  return pow(t - 1.0, 5.0) + 1.0;
}

#pragma glslify: export(qinticOut)
