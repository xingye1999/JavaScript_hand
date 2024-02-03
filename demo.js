let arr = [1, 2, 3, [5, 5, [6, 7, 8]], 8, 8, 9, [9]]
// console.log(arr.flat(Infinity))

function flatArr(arr) {
  let newArr = []
  for (let v of arr) {
    if (Array.isArray(v)) {
      newArr = newArr.concat(flatArr(v))
    } else {
      newArr.push(v)
    }
  }
  return newArr
}
console.log(flatArr(arr))

console.log([1, 2, 3].concat(5))
console.log([1, 2, 3].concat([5, 6]))
