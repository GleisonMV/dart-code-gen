const internalClass = require('./InternalClass')
const internalFunction = require('./InternalFunction')
const Utils = require('./utils')

class Builder {

    constructor() { this.build = [] }

    Class(name) {
        const i = { type: 'class', name, content: [] }
        this.build.push(i)
        return internalClass.setInternalClass(i)
    }

    Import(name, alias) {
        const i = { type: 'import', name, alias }
        this.build.push(i)
        return this
    }

    Variable(type, name, value) {
        const i = { type: 'variable', returns: type, name, value }
        this.build.push(i)
        return this
    }

    Function(name) { return internalFunction.generate(name, this.build) }

    Call(prefix, ...values) {
        const i = { type: 'call', value: Utils.makeArgs(values), prefix }
        this.build.push(i)
        return this
    }

    CallValue(prefix, ...values) {
        return { type: 'call', prefix, value: Utils.makeArgs(values) }
    }

    MapValue(value) {
        return { type: 'map', value }
    }

    String(value) { return `'${value}'` }
}

module.exports = Builder
