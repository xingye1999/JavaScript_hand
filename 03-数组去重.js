// 手写数组扁平化
// 1.flat
function flatten1(arr) {
  return arr.flat(Infinity)
}

// 2.1递归
function flatten2(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    // 如果元素是数组，数组的结果通过数组的 concat 方法拼接到最后要返回的 result 数组
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten2(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}
// 2.2递归
// const arr = [1, 2, 3, [4, 5, [6, [7]]], [8, 9]]
// const res = []
// function flatten(arr) {
//   if (Array.isArray(arr)) {
//     for (let i = 0; i < arr.length; i++) {
//       if (Array.isArray(arr[i])) {
//         flatten(arr[i])
//       } else {
//         res.push(arr[i])
//       }
//     }
//   } else {
//     res.push(arr)
//   }
// }
// flatten(arr)
// console.log(res)

// 3.reduce
function flatten3(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten3(cur) : cur)
  }, [])
}

let arr = [1, [2, [3, 4]]]
console.log(flatten3(arr))
