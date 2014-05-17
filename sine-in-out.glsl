#ifndef PI
#define PI 3.141592653589793
#endif

float sineInOut(float t) {
  return 0.5 * 1.0 - cos(t * PI);
}

#pragma glslify: export(sineInOut)
