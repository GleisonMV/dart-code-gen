const Code = require('./index')

const builder = new Code.Builder()

builder.Import('test')
builder.Import('test/test', 'test')

builder.Function('main')

builder.Variable('int', 'x', 20)
builder.Variable('int', 'y')
builder.Variable('String', 'z', builder.String('test'))

builder.Function('test')
  .Async()

const home = builder.Class('Home')
  .Extends('StatelessWidget')

home.Function('build')
  .Override()
  .Type('Widget')
  .Param('context', 'BuildContext')

builder.Function('testParamI')
  .Type('void')
  .Param('x', 'int')
  .Param('y')

builder.Function('testParamII')
  .Type('void')
  .Async()
  .Param('x', 'int')
  .Param('y')

builder.Call('testParamII', 20, 40)

builder.Function('testParamIII')
  .Type('void')
  .Async()
  .Param('x', 'int')
  .OptionalParam([
    { name: 'y', type: 'int' }])

builder.Call('testParamIII', 20, 50)

builder.Function('testParamIV')
  .Type('void')
  .Async()
  .Param('x', 'int')
  .OptionalParam([{
    name: 'y',
    type: 'int',
    value: 20
  }])

builder.Function('add')
  .Type('int')
  .Param('x', 'int')
  .NamedParam([{
    name: 'y',
    type: 'int',
    value: 20
  }])
  .Return('x + y')

builder.Function('calc')
  .Type('void')
  .Return(builder.CallValue('add', 20, { y: 40 }))

builder.Call('testParamV', 44, { y: 66 })

builder.Class('TestI')
builder.Class('TestII')
builder.Class('TestIII')
  .Implements('TestI')

builder.Class('TestIV')
  .Implements('TestI')
  .Implements('TestII')

const writer = new Code.Writer(builder)
console.log(writer.toString())
