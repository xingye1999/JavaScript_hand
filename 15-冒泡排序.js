function bubbleSort(arr) {
  for (let i = 1; i <= arr.length - 1; i++) {
    for (let j = 0; j <= arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
  return arr
}

let arr = [1, 5, 2, 8, 6, 4, 3, 9, 7]
console.log('arr', bubbleSort(arr))
