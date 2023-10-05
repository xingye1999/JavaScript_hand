/**
 * @param {obj: object, res: array}
 * @return {arr: array}
 */
function treeToArray(obj, res = []) {
  // 默认初始结果数组为[]
  const newObj = { ...obj }
  delete newObj.children
  // 当前元素入栈
  res.push(newObj)
  // 若元素包含children，则遍历children并递归调用使每一个子元素入栈
  if (obj.children) {
    for (const item of obj.children) {
      treeToArray(item, res)
    }
  }
  return res
}

/** 树状形结构数据treeData */
const tree = [
  {
    id: 2,
    title: "中国",
    pid: 0,
    children: [
      {
        id: 3,
        title: "广东省",
        pid: 2,
        children: [
          {
            id: 4,
            title: "广州市",
            pid: 3,
            children: [{ id: 5, title: "天河区", pid: 4 }],
          },
        ],
      },
      { id: 6, title: "湖南省", pid: 2 },
    ],
  },
  { id: 1, title: "俄罗斯", pid: 0 },
]

const res = []
for (let i = 0; i < tree.length; i++) {
  treeToArray(tree[i], res)
}
console.log(res)
