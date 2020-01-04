const Utils = require('./utils')

class InternalFunction {

    setInternalFunction(obj) { this.obj = obj; return this; }

    generate(name, array) {
        const i = { type: 'function', return: 'void', name, params: [], content: [] }
        array.push(i)
        return this.setInternalFunction(i)
    }

    Override() { this.obj.override = true; return this; }
    Constructor() { this.obj.Constructor = true; return this; }

    Type(name) { this.obj.return = name; return this; }

    Async() { this.obj.async = true; return this; }

    Param(name, type = null) { this.obj.params.push({ name, type }); return this }

    OptionalParam(params) {
        this.obj.use = 'optional'
        this.obj.optional = params
        return this
    }

    NamedParam(params) {
        this.obj.use = 'named'
        this.obj.optional = params
        return this
    }

    Variable(type, name, value) {
        const i = { type: 'variable', returns: type, name, value }
        this.obj.content.push(i)
        return this
    }

    Return(value) {
        const i = { type: 'return', value }
        this.obj.content.push(i)
        return this
    }

    Call(prefix, ...values) {
        const i = { type: 'call', value: Utils.makeArgs(values), prefix }
        this.obj.content.push(i)
        return this
    }
}

module.exports = new InternalFunction()
