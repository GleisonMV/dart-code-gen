const Code = require('./index')

const builder = new Code.Builder()

builder.Call('Scaffold', {
  appBar: builder.CallValue('AppBar', {
    title: builder.CallValue('Text', builder.String('Awesome'))
  })
})

builder.Function('add')
  .Param('x')
  .Param('y')
  .Return('x + y')

builder.Variable('var', 'x', [20, 25, builder.CallValue('add', 20, 40)])
builder.Variable('var', 'x', [20, 25, builder.MapValue({
  x: 70,
  y: 60
})])

const writer = new Code.Writer(builder)
console.log(writer.toString())
