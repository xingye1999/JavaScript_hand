function binarySearch(arr, target, start, end) {
  let mid = Math.floor((start + end) / 2)
  if (arr[mid] === target) {
    return mid
  }
  if (start >= end) {
    return -1
  }
  if (arr[mid] < target) {
    binarySearch(arr, target, mid + 1, end)
  } else if (arr[mid] > target) {
    binarySearch(arr, target, start, mid - 1)
  }
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(binarySearch(arr, 5, 0, arr.length - 1))
