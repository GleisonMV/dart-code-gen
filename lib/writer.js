const StringBuilder = require('./StringBuilder')

class Writer {
    constructor(builder, options) {
        this.builder = builder
        this.options = Object.assign({
            tabSymbol: '  '
        }, options)
        this.string = new StringBuilder()
        this.__internal__build(0, this.builder.build)
    }

    __internal__build(tab, build) {
        for (const item of build) {
            switch (item.type) {
                case 'class':
                    this.__class(item, tab)
                    break
                case 'import':
                    this.__import(item, tab)
                    break
                case 'function':
                    this.__function(item, tab)
                    break
                case 'variable':
                    this.__variable(item, tab)
                    break
                case 'return':
                    this.__return(item, tab)
                    break
                case 'call':
                    this.__call(item, tab)
                    break
            }
        }
    }

    __return(obj, tab) {
        this.string.tab(tab, this.options.tabSymbol)
        this.string.append('return ')
        this.__value(obj, tab)
        this.string.append(';')
        this.string.newLine()
    }

    __call(obj, tab, value = false) {
        if (!value) { this.string.tab(tab, this.options.tabSymbol) }
        this.string.append(`${obj.prefix}(`)
        var first = true
        if (obj.value) {
            for (let arg of obj.value) {
                if (!first) this.string.append(', '); else first = false;
                this.string.newLine()
                this.string.tab(tab + 1, this.options.tabSymbol)
                if (arg.name && arg.value) {
                    this.string.append(`${arg.name}: `)
                    this.__value(arg, tab + 1)
                } else if (!arg.name && arg.value) {
                    this.__value(arg, tab + 1)
                }
            }
        }
        this.string.newLine()
        this.string.tab(tab, this.options.tabSymbol)
        this.string.append(')')
        if (!value) {
            this.string.append(';')
            this.string.newLine()
        }
    }

    __value(obj, tab) {
        if (obj.value == null) return
        if (Array.isArray(obj.value)) {
            var first = true
            this.string.append('[');
            for (let item of obj.value) {
                if (!first) this.string.append(', '); else first = false
                this.__value({ value: item }, tab)
            }
            this.string.append(']');
        } else if (obj.value.constructor === Object) {
            if (obj.value.type === 'call') {
                this.__call(obj.value, tab, true)
            } else if (obj.value.type === 'map') {
                var first = true
                this.string.newLine()
                this.string.tab(tab, this.options.tabSymbol)
                this.string.append('{');
                for (let key in obj.value.value) {
                    let item = obj.value.value[key]
                    if (!first) this.string.append(', ');
                    else first = false
                    this.string.newLine()
                    this.string.tab(tab + 1, this.options.tabSymbol)
                    this.string.append(`'${key}': `);
                    this.__value({ value: item }, tab)
                }
                this.string.newLine()
                this.string.tab(tab, this.options.tabSymbol)
                this.string.append('}');
            } else {
                this.string.append(obj.value)
            }
        } else {
            this.string.append(obj.value)
        }
    }

    __variable(obj, tab) {
        this.string.tab(tab, this.options.tabSymbol)
        if (obj.returns && obj.name) { this.string.append(`${obj.returns} ${obj.name}`) } else if (!obj.returns && obj.name) { this.string.append(`${obj.name}`) }
        if (obj.value) {
            this.string.append(' = ')
            this.__value(obj, tab)
        }
        this.string.append(';')
        this.string.newLine()
    }

    __import(obj, tab) {
        this.string.tab(tab, this.options.tabSymbol)
        if (obj.alias) { this.string.append(`import '${obj.name}' as ${obj.alias};`) } else { this.string.append(`import '${obj.name}';`) }
        this.string.newLine()
    }

    __class(obj, tab) {
        this.string.newLine()
        this.string.tab(tab, this.options.tabSymbol)
        this.string.append(`class ${obj.name}`)
        if (obj.extends) {
            this.string.append(` extends ${obj.extends}`)
        }
        if (obj.implements) {
            this.string.append(' implements ')
            var first = true
            for (const implement of obj.implements) {
                if (!first) this.string.append(', '); else first = false
                this.string.append(implement)
            }
        }
        this.string.append(' {')
        this.string.newLine()
        this.__internal__build(tab + 1, obj.content)
        this.string.tab(tab, this.options.tabSymbol)
        this.string.append('}')
        this.string.newLine()
    }

    __function(obj, tab) {
        this.string.newLine()
        if (obj.override) {
            this.string.tab(tab, this.options.tabSymbol)
            this.string.append('@override')
            this.string.newLine()
        }
        this.string.tab(tab, this.options.tabSymbol)
        this.string.append(`${obj.return} ${obj.name}`)
        this.string.append('(')
        var first = true
        if (obj.params) {
            for (const param of obj.params) {
                if (!first) this.string.append(', '); else first = false
                if (param.type && param.name) {
                    this.string.append(`${param.type} ${param.name}`)
                } else if (!param.type && param.name) {
                    this.string.append(`${param.name}`)
                }
            }
        }
        if (obj.use && obj.optional) {
            var optional = true
            if (!first) this.string.append(', '); else first = false
            this.string.append(obj.use == 'named' ? '{' : '[')
            for (const param of obj.optional) {
                if (!optional) this.string.append(', '); else optional = false
                if (!param.type && param.name) {
                    this.string.append(`${param.name}`)
                } else if (param.type && param.name) {
                    this.string.append(`${param.type} ${param.name}`)
                } else if (!param.type && param.name) {
                    this.string.append(`${param.name}`)
                }
                if (param.value) {
                    this.string.append(obj.use == 'named' ? ' : ' : ' = ')
                    this.__value(param, tab)
                }
            }
            this.string.append(obj.use == 'named' ? '}' : ']')
        }
        this.string.append(')')
        if (obj.async) {
            this.string.append(' async ')
        }
        this.string.append('{')
        this.string.newLine()
        this.__internal__build(tab + 1, obj.content)
        this.string.tab(tab, this.options.tabSymbol)
        this.string.append('}')
        this.string.newLine()
    }

    toString() {
        return this.string.toString()
    }

    toFile(path) {
        require('fs').writeFileSync(path, this.toString());
    }
}

module.exports = Writer
