// 柯里化函数
const curry = func => {
  return function curryFunc(...args) {
    // 实参 < 形参, 返回一个函数，并等待接受剩余参数
    if (args.length < func.length) {
      return function () {
        // 合并每次调用函数时传递的参数
        return curryFunc(...[...args, ...Array.from(arguments)])
      }
    }
    // 当实参 >= 形参时，直接执行函数返回结果
    return func(...args)
  }
}

function test(n1, n2, n3) {
  return n1 + n2 + n3
}

const result = curry(test)
console.log('sum', result(1)(2)(3)) // 6
console.log('sum', result(1, 2)(1)) // 4
console.log('sum', result(1)(2)(1)) // 4
console.log('sum', result(1, 2, 1)) // 4
