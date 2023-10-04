function merge(left, right) {
  let i = 0
  let j = 0
  let res = []
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i])
      i++
    } else {
      res.push(right[j])
      j++
    }
  }

  if (i === left.length) {
    res.push(...right.slice(j))
  } else {
    res.push(...left.slice(i))
  }
  return res
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = mergeSort(arr.slice(0, mid))
  let right = mergeSort(arr.slice(mid, arr.length))
  return merge(left, right)
}

let arr = [1, 5, 2, 8, 6, 4, 3, 9, 7]
console.log("arr", mergeSort(arr))
