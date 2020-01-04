const internalFunction = require('./InternalFunction')

class InternalClass {

  setInternalClass(obj) {
    this.obj = obj
    return this
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
    return internalFunction.generate(name, this.obj.content)
  }

  Variable(type, name, value) {
    const i = { type: 'variable', returns: type, name, value }
    this.obj.content.push(i)
    return this
  }
}

module.exports = new InternalClass()
