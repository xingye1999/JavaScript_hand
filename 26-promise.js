// 模拟实现MyPromise
// MyPromise利用三大手段解决回调地狱：
// 1. 回调函数延迟绑定
// 2. 返回值穿透
// 3. 错误冒泡

// 定义三种状态
const PENDING = "PENDING" // 进行中
const FULFILLED = "FULFILLED" // 已成功
const REJECTED = "REJECTED" // 已失败

class MyPromise {
  constructor(exector) {
    // 初始化状态
    this.status = PENDING
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined
    this.reason = undefined
    // 实现异步调用
    // 成功态回调函数队列
    this.onFulfilledCallbacks = []
    // 失败态回调函数队列
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 成功态函数依次执行
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value))
      }
    }
    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 失败态函数依次执行
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason))
      }
    }
    try {
      // 立即执行executor
      // 把内部的resolve和reject传入executor，用户可调用resolve和reject
      exector(resolve, reject)
    } catch (e) {
      // executor执行出错，将错误内容reject抛出去
      reject(e)
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
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            // try捕获错误
            try {
              // 模拟微任务
              const result = onFulfilled(this.value)
              // 分两种情况：
              // 1. 回调函数返回值是MyPromise，执行then操作
              // 2. 如果不是MyPromise，调用新MyPromise的resolve函数
              result instanceof MyPromise
                ? result.then(resolve, reject)
                : resolve(result)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            // 以下同理
            try {
              const result = onRejected(this.reason)
              // 不同点：此时是reject
              result instanceof MyPromise
                ? result.then(resolve, reject)
                : resolve(result)
            } catch (e) {
              reject(e)
            }
          })
        })
      } else if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value)
            result instanceof MyPromise
              ? result.then(resolve, reject)
              : resolve(result)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason)
            result instanceof MyPromise
              ? result.then(resolve, reject)
              : resolve(result)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      // 如果是MyPromise实例，直接返回
      return value
    } else {
      // 如果不是MyPromise实例，返回一个新的MyPromise对象，状态为FULFILLED
      return new MyPromise((resolve, reject) => resolve(value))
    }
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(MyPromiseArr) {
    const len = MyPromiseArr.length
    const values = new Array(len)
    // 记录已经成功执行的MyPromise个数
    let count = 0
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        // MyPromise.resolve()处理，确保每一个都是MyPromise实例
        MyPromise.resolve(MyPromiseArr[i]).then(
          (val) => {
            values[i] = val
            count++
            // 如果全部执行完，返回MyPromise的状态就可以改变了
            if (count === len) resolve(values)
          },
          (err) => reject(err)
        )
      }
    })
  }
  static race(MyPromiseArr) {
    return new MyPromise((resolve, reject) => {
      MyPromiseArr.forEach((p) => {
        MyPromise.resolve(p).then(
          (val) => resolve(val),
          (err) => reject(err)
        )
      })
    })
  }
}

// const customPromise1 = new MyPromise((resolve, reject) => {
//   console.log(1)
//   //resolve("Resolved one!")
//   reject("Reject one!")
// })
// customPromise1
//   .then((result) => {
//     console.log(2)
//     console.log("first", result)
//     return 3
//   })
//   .then((result) => {
//     console.log("second", result)
//     return 5
//   })
//   .then(4)
//   .then((result) => {
//     console.log("third", result)
//   })
//   .catch((e) => {
//     console.log(e)
//   })
console.log("-----------------------")
// const customPromise2 = MyPromise.resolve(1)
// customPromise2.then((result) => {
//   console.log(result)
// })

console.log("------------------------")
// const customPromise3 = MyPromise.reject(111)
// customPromise3.catch((result) => {
//   console.log(result)
// })
