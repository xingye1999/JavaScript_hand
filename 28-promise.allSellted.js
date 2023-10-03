/**
 * Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。
 * 只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更。
 */

function promiseAllSettled(promiseArr) {
  return new Promise((resolve, reject) => {
    let result = []
    let count = 0
    for (let i = 0; i < promiseArr.length; i++) {
      Promise.resolve(promiseArr[i]).then(
        (res) => {
          result[i] = { status: "fulfilled", val: res }
          count++
          if (count === promiseArr.length) resolve(result)
        },
        (err) => {
          result[i] = { status: "rejected", val: err }
          count++
          if (count === promiseArr.length) resolve(result)
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

// 所有 Promise 实例都成功
promiseAllSettled([p1, p2, p3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
// [
//   { status: 'fulfilled', value: 'p1' },
//   { status: 'fulfilled', value: 'p2 延时一秒' },
//   { status: 'fulfilled', value: 'p3 延时两秒' }
// ]

// 有一个 promiseAllSettled 失败
promiseAllSettled([p1, p2, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
// [
//   { status: 'fulfilled', value: 'p1' },
//   { status: 'fulfilled', value: 'p2 延时一秒' },
//   { status: 'rejected' , value: 'p4 rejected' }
// ]

// 所有 promiseAllSettled 都失败
promiseAllSettled([p4, p5])
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
// [
//   { status: 'rejected', reason: 'p4 rejected' },
//   { status: 'rejected', reason: 'p5 rejected 延时1.5秒' }
// ]
