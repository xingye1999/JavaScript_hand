function bubbleSort(arr) {
  //趟数
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
  return arr
}

let arr = [1, 5, 2, 8, 6, 4, 3, 9, 7]
console.log("arr", bubbleSort(arr))
