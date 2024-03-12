// 定义分区函数，它会将数组的一部分分为两部分，返回基准元素的最终位置
function partition(array, left, right) {
  // 选择基准元素，这里选择了最左边的元素
  const pivot = array[left];
  let i = left; // 左指针
  let j = right; // 右指针

  while (i < j) {
    // 从右侧向左查找第一个小于基准元素的元素
    while (i < j && array[j] >= pivot) {
      j--;
    }
    if (i < j) {
      // 找到了一个小于基准元素的元素，将它移到左侧
      array[i] = array[j];
      i++;
    }

    // 从左侧向右查找第一个大于基准元素的元素
    while (i < j && array[i] <= pivot) {
      i++;
    }
    if (i < j) {
      // 找到了一个大于基准元素的元素，将它移到右侧
      array[j] = array[i];
      j--;
    }
  }

  // 将基准元素放到最终的位置上
  array[i] = pivot;

  // 返回基准元素的最终位置
  return i;
}

// 快速排序函数，对数组的指定范围进行排序
function quickSort(array, left, right) {
  if (left < right) {
    // 使用分区函数得到基准元素的最终位置
    const pivotIndex = partition(array, left, right);

    // 递归排序左侧子数组
    quickSort(array, left, pivotIndex - 1);

    // 递归排序右侧子数组
    quickSort(array, pivotIndex + 1, right);
  }
}

// 示例用法
const unsortedArray = [3, 6, 8, 10, 1, 2, 1];
quickSort(unsortedArray, 0, unsortedArray.length - 1);

// 输出排序后的数组
console.log(unsortedArray); // 输出 [1, 1, 2, 3, 6, 8, 10]

// function quickSort(arr) {
//   if (arr.length < 2) {
//     return arr
//   }
//   let cur = arr[arr.length - 1]
//   let left = arr.filter((v, i) => v <= cur && i != arr.length - 1)
//   let right = arr.filter((v) => v > cur)
//   return [...quickSort(left), cur, ...quickSort(right)]
// }

// let arr = [1, 5, 2, 8, 6, 4, 3, 9, 7]
// console.log("arr", quickSort(arr))

// let arr1 = [9, 7]
// console.log("arr1", quickSort(arr1))

// let arr2 = [9, 44, 418, 7, 7, 3, 5, 89, 44, 9]
// console.log("arr2", quickSort(arr2))
