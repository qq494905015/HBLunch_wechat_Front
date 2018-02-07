export function pick (obj) {
  let result = {}
  if (obj == null) {
    return result
  }
  let keys = Array.prototype.splice.call(arguments, 1)
  keys.forEach(key => { result[key] = obj[key] })
  return result
}
