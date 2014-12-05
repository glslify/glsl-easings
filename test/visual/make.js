var path = require('path')
var fs   = require('fs')

var root  = path.resolve(__dirname, '../..')
var base  = fs.readFileSync(path.join(__dirname, '_base.glsl'), 'utf8')
var files = fs.readdirSync(root).map(function(name) {
  return { name: name, root: path.resolve(root, name) }
}).filter(function(file) {
  return path.extname(file.name) === '.glsl'
})

files.forEach(function(file) {
  var content = base.replace('__MODULE__', '../../' + file.name)

  fs.writeFile(path.join(__dirname, file.name), content, function(err) {
    if (err) throw err
  })
})
