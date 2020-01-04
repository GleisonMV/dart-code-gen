exports.makeArgs = function (params) {
  const value = []
  for (const i of params) {
    if (i && i.constructor === Object) {
      for (const key in i) {
        value.push({ name: key, value: i[key] })
      }
    } else {
      value.push({ value: i })
    }
  }
  return value
}
