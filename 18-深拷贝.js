const obj = {
  a: 110,
  b: 'ssss',
  c: {
    aa: 123456,
    val: {
      b: 'ccc'
    }
  }
}
obj.obj = obj
//考虑循环引用
function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {
    const cloneObj = Array.isArray(target) ? [] : {}
    if (map.get(target)) return map.get(target)
    map.set(target, cloneObj)
    for (let key in target) {
      cloneObj[key] = deepClone(target[key], map)
    }

    return cloneObj
  } else {
    return target
  }
}
console.log(obj)
console.log(deepClone(obj))
