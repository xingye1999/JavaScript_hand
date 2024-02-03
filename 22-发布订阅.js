class EventBus {
  constructor() {
    this.event = {}
  }
  //实现订阅
  on(name, callback) {
    if (this.event[name]) {
      this.event[name].push(callback)
    } else {
      this.event[name] = [callback]
    }
  }
  //取消订阅
  off(name, callback) {
    if (!this.event[name]) return
    // 如果没有callback,就删掉整个事件
    if (!callback) this.event[name] = []
    this.event[name] = this.event[name].filter((item) => item !== callback)
  }

  //触发事件
  emit(name, ...args) {
    if (!this.event[name]) return
    this.event[name].forEach((callback) => callback(...args))
  }
}
