# dart-code-gen

## import
```
builder.Import('sample')
```
> import 'sample'
```
builder.Import('sample', 'sample')
```
> import 'sample' as sample 

## Variable
```
builder.Variable('int', 'x', 20)
```
> int x = 20;
```
builder.Variable('int', 'y')
```
> int y;
```
builder.Variable('final', 'z', 20)
```
> final z = 20;
```
builder.Variable('String', 'z', builder.String('test'))
```
> String z = 'test';

...
Documentation in Progress