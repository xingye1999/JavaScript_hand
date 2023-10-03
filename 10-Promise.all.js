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
