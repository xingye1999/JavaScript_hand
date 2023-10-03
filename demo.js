class Scheduler {
  constructor() {
    this.queue = []
    this.maxCount = 2
    this.runCount = 0
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator)
  }

  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }

  request() {
    if (!this.queue.length || this.runCount >= this.maxCount) {
      return
    }
    this.runCount++
    const task = this.queue.shift()
    task().then(() => {
      this.runCount--
      this.request()
    })
  }
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() =>
    timeout(time).then(() => {
      console.log(`任务${order}完成`)
    })
  )
}

addTask(10000, 1) // 10000ms后输出 任务1完成
addTask(5000, 2) // 5000ms后输出 任务2完成
addTask(3000, 3) // 8000ms后输出 任务3完成
addTask(4000, 4) // 11000ms后输出 任务4完成
addTask(5000, 5) // 15000ms后输出 任务5完成
scheduler.taskStart()
