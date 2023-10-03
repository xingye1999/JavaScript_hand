//功能与promise.all相反
/**
 * Promise.any 与 Promise.all 可以看做是相反的。Promise.any
 * 中只要有一个 Promise 实例成功就成功，只有当所有的 Promise
 * 实例失败时 Promise.any 才失败，此时Promise.any 会把所有的
 * 失败/错误集合在一起，返回一个失败的 promise 和AggregateError类型的实例。
 * @param {*} promiseArr
 * @returns
 */
function promiseAny(promiseArr) {
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i]).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          result[i] = err
          count++
          if (count === promiseArr.length)
            reject(new AggregateError(result, "All promises were rejected"))
        }
      )
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

const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p5 rejected 延时1.5秒")
  }, 1500)
})

// 所有 Promise 都成功
promiseAny([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) // p1

// 两个 Promise 成功
promiseAny([p1, p2, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) // p1

// 只有一个延时成功的 Promise
promiseAny([p2, p4, p5])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) // p2 延时1秒

// 所有 Promise 都失败
promiseAny([p4, p5])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) // 没有promise成功
