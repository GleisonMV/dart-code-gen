const InternalFunction = require('./InternalFunction')

class InternalClass {

  constructor(name, array) {
    this.obj = { type: 'class', name, content: [] }
    array.push(this.obj)
  }

  Extends(name) {
    this.obj.extends = name
    return this
  }

  Implements(name) {
    if (this.obj.implements == null) {
      this.obj.implements = []
    }
    this.obj.implements.push(name)
    return this
  }

  Function(name) {
    return new InternalFunction(name, this.obj.content)
  }

  Constructor() {
    return this.Function(this.obj.name).Constructor()
  }

  Variable(type, name, value) {
    const i = { type: 'variable', returns: type, name, value }
    this.obj.content.push(i)
    return this
  }
}

module.exports = InternalClass
