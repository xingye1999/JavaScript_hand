function quickSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let cur = arr[arr.length - 1]
  let left = arr.filter((v, i) => v <= cur && i != arr.length - 1)
  let right = arr.filter((v) => v > cur)
  return [...quickSort(left), cur, ...quickSort(right)]
}

let arr = [1, 5, 2, 8, 6, 4, 3, 9, 7]
console.log("arr", quickSort(arr))

let arr1 = [9, 7]
console.log("arr1", quickSort(arr1))

let arr2 = [9, 44, 418, 7, 7, 3, 5, 89, 44, 9]
console.log("arr2", quickSort(arr2))
