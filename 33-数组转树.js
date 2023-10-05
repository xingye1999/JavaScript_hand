const arr = [
  { id: 2, title: "中国", pid: 0 },
  { id: 3, title: "广东省", pid: 2 },
  { id: 4, title: "广州市", pid: 3 },
  { id: 5, title: "天河区", pid: 4 },
  { id: 6, title: "湖南省", pid: 2 },
  { id: 1, title: "俄罗斯", pid: 0 },
]

/**
 * @param {arr: array 原数组数组, id: number 父节点id}
 * @return {children: array 子数组}
 */
function arrayToTree(arr, id) {
  const res = []
  for (const item of arr) {
    if (item.pid === id) {
      // 找到当前id的子元素
      const children = arrayToTree(arr, item.id)
      // 插入子元素，每个子元素的children通过回调生成
      if (children.length > 0) {
        res.push({ ...item, children })
      } else {
        res.push(item)
      }
    }
  }
  return res
}

console.log(arrayToTree(arr, 0))
