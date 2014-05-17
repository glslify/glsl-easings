var createBuffer = require('gl-buffer')
var createVAO = require('gl-vao')
var glslify = require('glslify')

var shell = require('gl-now')({
  clearColor: [0, 0, 0, 0]
}).on('gl-init', function() {
  var gl = this.gl

  var line = new Float32Array(400)

  for (var i = 0; i < line.length; i++) {
    line[i] = i / (line.length - 1)
  }

  this.line = createVAO(gl, [{
    buffer: createBuffer(gl, line)
    , size: 1
  }])

  this.line.length = line.length

  this.shader = glslify({
      vertex: './test.vert'
    , fragment: './test.frag'
  })(gl)
}).on('gl-render', function() {
  var gl = this.gl

  this.shader.bind()
  this.shader.attributes.aPosition.location = 0

  gl.lineWidth(5)
  this.line.bind()
  this.line.draw(gl.LINE_STRIP, this.line.length)
  this.line.unbind()
})
