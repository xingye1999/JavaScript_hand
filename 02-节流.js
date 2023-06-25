/**
 * 节流函数 一个函数执行一次后，只有大于设定的执行周期才会执行第二次。有个需要频繁触发的函数，出于优化性能的角度，在规定时间内，只让函数触发的第一次生效，后面的不生效。
 * @param fn要被节流的函数
 * @param delay规定的时间
 */

function throttle1(fn, delay) {
    let timer = null
    return function () {
        // 这儿是重点  如果时间没到  那么 timer 就不为 null  就会返回  不会往下执行！！！
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            // 时间到了  timer  被设置为null  就走到这儿来了 就会执行
            fn.apply(this, arguments)
            timer = null
        }, delay)
    }
}

// 综合上面两步 就实现了 英雄 技能cd  一样的节流

function throttle2(fn, delay) {
    //记录上一次函数触发的时间
    var lastTime = 0
    return function () {
        //记录当前函数触发的时间
        var nowTime = Data.now()
        //修正this指向问题
        if (nowTime - lastTime > delay) {
            //修正this指向问题
            fn.apply(this, arguments)
            //同步执行结束时间
            lastTime = nowTime
        }
    }
}
