precision mediump float;

#pragma glslify: ease = require(__MODULE__)

attribute float aPosition;
uniform vec2 uScreen;
uniform mat4 uModel;

void main() {
  vec2 position = vec2(aPosition, ease(aPosition));

  position.x /= uScreen.x / uScreen.y;
  position.x -= 0.25;
  position.y -= 0.5;

  gl_Position = uModel * vec4(position.x, position.y, 1.0, 1.0);
}
