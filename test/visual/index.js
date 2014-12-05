var canvas   = document.body.appendChild(document.createElement('canvas'))
var gl       = require('gl-context')(canvas, render)
var glBuffer = require('gl-buffer')
var mat4     = require('gl-mat4')
var glslify  = require('glslify')
var glVAO    = require('gl-vao')

var LINE_PRECISION = 400

var line = new Float32Array(LINE_PRECISION)
for (var i = 0; i < LINE_PRECISION; i++) {
  line[i] = i / (LINE_PRECISION - 1)
}

line = glVAO(gl, [{
  buffer: glBuffer(gl, line)
  , size: 1
}])

var shaders = {
    linear           : glslify({ frag: './frag.glsl', vert: './linear.glsl' })(gl)
  , backInOut        : glslify({ frag: './frag.glsl', vert: './back-in-out.glsl' })(gl)
  , backOut          : glslify({ frag: './frag.glsl', vert: './back-out.glsl' })(gl)
  , backIn           : glslify({ frag: './frag.glsl', vert: './back-in.glsl' })(gl)
  , bounceInOut      : glslify({ frag: './frag.glsl', vert: './bounce-in-out.glsl' })(gl)
  , bounceOut        : glslify({ frag: './frag.glsl', vert: './bounce-out.glsl' })(gl)
  , bounceIn         : glslify({ frag: './frag.glsl', vert: './bounce-in.glsl' })(gl)
  , circularInOut    : glslify({ frag: './frag.glsl', vert: './circular-in-out.glsl' })(gl)
  , circularOut      : glslify({ frag: './frag.glsl', vert: './circular-out.glsl' })(gl)
  , circularIn       : glslify({ frag: './frag.glsl', vert: './circular-in.glsl' })(gl)
  , cubicInOut       : glslify({ frag: './frag.glsl', vert: './cubic-in-out.glsl' })(gl)
  , cubicOut         : glslify({ frag: './frag.glsl', vert: './cubic-out.glsl' })(gl)
  , cubicIn          : glslify({ frag: './frag.glsl', vert: './cubic-in.glsl' })(gl)
  , elasticInOut     : glslify({ frag: './frag.glsl', vert: './elastic-in-out.glsl' })(gl)
  , elasticOut       : glslify({ frag: './frag.glsl', vert: './elastic-out.glsl' })(gl)
  , elasticIn        : glslify({ frag: './frag.glsl', vert: './elastic-in.glsl' })(gl)
  , exponentialInOut : glslify({ frag: './frag.glsl', vert: './exponential-in-out.glsl' })(gl)
  , exponentialOut   : glslify({ frag: './frag.glsl', vert: './exponential-out.glsl' })(gl)
  , exponentialIn    : glslify({ frag: './frag.glsl', vert: './exponential-in.glsl' })(gl)
  , quadraticInOut   : glslify({ frag: './frag.glsl', vert: './quadratic-in-out.glsl' })(gl)
  , quadraticOut     : glslify({ frag: './frag.glsl', vert: './quadratic-out.glsl' })(gl)
  , quadraticIn      : glslify({ frag: './frag.glsl', vert: './quadratic-in.glsl' })(gl)
  , quarticInOut     : glslify({ frag: './frag.glsl', vert: './quartic-in-out.glsl' })(gl)
  , quarticOut       : glslify({ frag: './frag.glsl', vert: './quartic-out.glsl' })(gl)
  , quarticIn        : glslify({ frag: './frag.glsl', vert: './quartic-in.glsl' })(gl)
  , quinticInOut     : glslify({ frag: './frag.glsl', vert: './quintic-in-out.glsl' })(gl)
  , quinticOut       : glslify({ frag: './frag.glsl', vert: './quintic-out.glsl' })(gl)
  , quinticIn        : glslify({ frag: './frag.glsl', vert: './quintic-in.glsl' })(gl)
  , sineInOut        : glslify({ frag: './frag.glsl', vert: './sine-in-out.glsl' })(gl)
  , sineOut          : glslify({ frag: './frag.glsl', vert: './sine-out.glsl' })(gl)
  , sineIn           : glslify({ frag: './frag.glsl', vert: './sine-in.glsl' })(gl)
}

var linear   = glslify({ frag: './blue.glsl', vert: './linear.glsl' })(gl)
var names    = Object.keys(shaders)
var selected = null
var model    = mat4.create()
var dims     = []

mat4.scale(model, model, [0.5, 0.5, 0.5])

function render() {
  dims[0] = gl.drawingBufferWidth
  dims[1] = gl.drawingBufferHeight
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.viewport(0, 0, dims[0], dims[1])

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE)
  gl.lineWidth(1.5)

  for (var i = 0; i < names.length; i++) {
    var name = names[i]
    if (selected && selected !== name) continue

    shaders[name].bind()
    shaders[name].uniforms.uModel = model
    shaders[name].uniforms.uScreen = dims

    line.bind()
    line.draw(gl.LINE_STRIP, LINE_PRECISION)
  }

  linear.bind()
  linear.uniforms.uModel = model
  linear.uniforms.uScreen = dims
  line.bind()
  line.draw(gl.LINE_STRIP, LINE_PRECISION)

  gl.disable(gl.BLEND)
}

window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)

// Terrible Hacky UI
var ul = document.body.appendChild(document.createElement('ul'))

ul.style.color = '#fff'
ul.style.position = 'fixed'
ul.style.width = '200px'
ul.style.fontSize = '0.9em'
ul.style.top = 0
ul.style.left = 0
ul.style.bottom = 0
ul.style.margin = 0
ul.style.padding = 0
ul.style.listStyle = 'none'
ul.style.overflow = 'auto'
ul.style.fontFamily = 'Source Code Pro'

names.forEach(function(name) {
  var li = ul.appendChild(document.createElement('li'))
  li.innerHTML = name
  li.style.padding = '1em'
  li.addEventListener('mouseover', function() {
    li.style.background = '#fff'
    li.style.color = '#000'
    selected = name
  }, false)
  li.addEventListener('mouseout', function() {
    li.style.background = '#000'
    li.style.color = '#fff'
  }, false)
})

ul.addEventListener('mouseleave', function(e) {
  if (e.target !== this) return
  selected = null
})
