class Scheduler {
  constructor() {
    this.queue = []
    this.maxCount = 2
    this.runCounts = 0
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
    if (!this.queue.length || this.runCounts >= this.maxCount) {
      return
    }
    this.runCounts++
    const task = this.queue.shift()
    //这一步是为了调用完毕，继续并行调用
    task().then(() => {
      this.runCounts--
      this.request()
    })
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() =>
    timeout(time).then(() => {
      console.log(`任务${order}完成`)
    })
  )
}

addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")

scheduler.taskStart()
