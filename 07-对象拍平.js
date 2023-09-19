const obj = {
  a: 1,
  b: [1, 2, { c: true }, [3]],
  c: { e: 2, f: 3 },
  g: null
}
function flatten(myObj) {
  const flatObj = {} // 用于存储扁平化后的对象
  let flag = null // 标志，用于记录当前的键名

  function formatKey(obj, keyName) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // 值为对象时，递归处理
        if (!keyName) {
          formatKey(obj[key], key) // 如果没有键名，直接使用当前的键名
        } else {
          if (Array.isArray(obj)) {
            formatKey(obj[key], `${keyName}[${key}]`) // 处理属性值为数组的情况
          } else {
            formatKey(obj[key], `${keyName}.${key}`) // 处理属性值为对象的情况
          }
        }
      } else {
        // 值不为对象或者值为null时，将键值对添加到扁平化对象中
        if (!keyName) {
          flatObj[key] = obj[key] // 如果没有键名，直接使用当前的键名
        } else {
          if (Array.isArray(obj)) {
            flatObj[`${keyName}[${key}]`] = obj[key] // 处理属性值为数组的情况
          } else {
            flatObj[`${keyName}.${key}`] = obj[key] // 处理属性值为对象的情况
          }
        }
      }
    }
  }

  formatKey(myObj, flag) // 初始调用，开始扁平化

  return flatObj // 返回扁平化后的对象
}

console.log(flatten(obj))
