const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
  constructor(exector) {
    // 初始状态
    this.status = PENDING
    // 执行成功
    this.value = undefined
    // 执行失败
    this.reason = undefined
    // 实现异步调用
    this.onFullfilledCallBacks = []
    this.onRejectedCallBacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFullfilledCallBacks.forEach((fn) => fn(this.value))
      }
    }

    const rejected = (reason) => {
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallBacks.forEach((fn) => fn(this.reason))
    }

    try {
      exector(resolve, rejected)
    } catch (error) {
      rejected(error)
    }
  }
  then(onFulfilled, onRejected) {
    //实现值穿透
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason)
          }
    return new MyPromise((resolve, reject) => {
      if (this.status === PENDING) {
        //实现promise异步调用
        this.onFullfilledCallBacks.push(() => {
          try {
            setTimeout(() => {
              const result = onFulfilled(this.value)
              result instanceof MyPromise
                ? result.then(resolve, reject)
                : resolve(result)
            })
          } catch (error) {
            reject(error)
          }
        })

        this.onRejectedCallBacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(this.reason)
              result instanceof MyPromise
                ? result.then(resolve, reject)
                : resolve(result)
            })
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(this.value)
            result instanceof MyPromise
              ? result.then(resolve, reject)
              : resolve(result)
          })
        } catch (error) {
          reject(error)
        }
      } else if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(self.reason)
            result instanceof MyPromise
              ? result.then(resolve, reject)
              : resolve(result)
          })
        } catch (e) {
          reject(e)
        }
      }
    })
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}
const customPromise = new MyPromise((resolve, reject) => {
  console.log(1)
  resolve("Resolved one!")
})
let a = customPromise.then((result) => {
  console.log("First then:", result)
  return 2
})
a.then((result) => {
  console.log("Second then:", result)
})

console.log("customPromise", customPromise)
console.log("a", a)
