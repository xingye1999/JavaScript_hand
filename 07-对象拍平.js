const input = { a: { b: { c: { f: 123 } } }, d: { e: { f: 456 } } }
let output = {}
function fn(input, key) {
  for (let item in input) {
    if (typeof input[item] == 'object') {
      fn(input[item], key + item)
    } else {
      output[key + item] = input[item]
    }
  }
}
for (let item in input) {
  fn(input[item], item)
}
console.log(output)
