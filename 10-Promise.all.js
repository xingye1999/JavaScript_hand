/**
 * Promise.all() 方法接收一个 promise 的 iterable 类型（注：Array，
 * Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例，
 * 那个输入的所有 promise 的 resolve 回调的结果是一个数组。这个Promise的
 * resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入
 * 的 iterable 里没有 promise 了的时候。它的 reject 回调执行是，只要任何一
 * 个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出
 * 错误，并且reject的是第一个抛出的错误信息。
 * @param {*} promiseArr
 * @returns
 */

function promiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i])
        .then((res) => {
          result[i] = res
          count++
          if (count === promiseArr.length) resolve(result)
        })
        .catch((err) => reject(err))
    }
  })
}

const p1 = Promise.resolve("p1")

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2 延时一秒")
  }, 1000)
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3 延时两秒")
  }, 2000)
})

const p4 = Promise.reject("p4 rejected")

// 所有Promise实例都成功
promiseAll([p1, p2, p3])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => console.log(err)) // 2秒后打印 [ 'p1', 'p2 延时一秒', 'p3 延时两秒' ]

// 一个Promise实例失败
promiseAll([p1, p2, p4])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => console.log(err)) // p4 rejected
