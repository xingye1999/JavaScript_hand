// 防抖

function debounce(fn, delay) {
  var timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流
function throttle(fn, time) {
  var lastTime = 0
  return function () {
    var nowTime = Data.now()
    if (nowTime - lastTime > time) {
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}

// 节流
function throttle1(fn, time) {
  var timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, time)
  }
}
