precision mediump float;

#pragma glslify: ease = require(./elastic-in-out)

attribute float aPosition;

void main() {
  vec2 position = vec2(aPosition, ease(aPosition));

  position *= 2.0;
  position -= 1.0;
  position *= 0.5;

  gl_Position = vec4(position.x, position.y, 1.0, 1.0);
}
