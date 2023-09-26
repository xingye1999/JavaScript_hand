let arr = [1, 2, 3, 4]
let x = arr.reduce((sum, value, index, arr) => {
  console.log("index", index)
  return sum + value
}, 0)
console.log(x)
