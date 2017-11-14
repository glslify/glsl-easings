float qinticOut(float t) {
  return 1.0 - pow(1.0 - t, 5.0);
}

#pragma glslify: export(qinticOut)
