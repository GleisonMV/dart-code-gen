class StringBuilder {
  constructor() { this.build = '' }

  tab(count, tab) { for (let i = 0; i < count; i++) this.build += tab }

  newLine() { this.build += '\n' }

  append(str) { this.build += str; return this }

  toString() { return this.build }
}

module.exports = StringBuilder
