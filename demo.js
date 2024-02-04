function add(a, b, c) {
  return a + b + c
}

function curry(func) {
  return function curryFunc(...args) {
    // 实参 < 形参, 返回一个函数，并等待接受剩余参数
    if (args.length < func.length) {
      return function () {
        // 合并每次调用函数时传递的参数
        return curryFunc(...args, ...arguments)
      }
    }
    // 当实参 >= 形参时，直接执行函数返回结果
    return func(...args)
  }
}

const result = curry(add)
console.log(result(3)(4)(5))
console.log(result(3, 4)(5))
