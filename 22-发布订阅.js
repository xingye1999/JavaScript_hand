class EventEmitter {
  constructor() {
    this.event = {};
  }
  //实现订阅
  on(name, callback) {
    if (this.event[name]) {
      this.event[name].push(callback);
    } else {
      this.event[name] = [callback];
    }
  }
  //取消订阅
  off(name, callback) {
    if (!this.event[name]) return;
    this.event[name] = this.event[name].filter((item) => item !== callback);
  }

  // 只执行一次订阅事件
  once(name, callback) {
    function fn() {
      callback();
      this.off(name, fn);
    }
    this.on(name, fn);
  }

  //触发事件
  emit(name, ...args) {
    if (!this.event[name]) return;
    // 1.没有once情况
    // this.event[name].forEach((callback) => callback(...args));
    // 2.有once情况
    this.event[name].forEach((callback) => callback.call(this, ...args));
  }


}

const e = new EventEmitter();

const handle = (...args) => {
  console.log(args);
};

e.on("click", handle);

e.emit("click", 1, 2, 3, 4);

e.off("click", handle);

e.emit("click", 1, 2);

e.once("dbClick", () => {
  console.log(123456);
});
e.emit("dbClick");
e.emit("dbClick");

