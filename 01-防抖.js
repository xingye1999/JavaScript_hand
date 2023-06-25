/**
 * 防抖函数  一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
 * @param fn要被节流的函数
 * @param delay规定的时间
 */
function debounce(fn, delay) {
    //记录上一次的延时器
    var timer = null
    return function () {
        //清除上一次的延时器
        clearTimeout(timer)
        //重新设置新的延时器
        timer = setTimeout(() => {
            //修正this指向问题
            fn.apply(this, arguments)
        }, delay)
    }
}
document.getElementById('btn').onclick = debounce(function () {
    console.log('按钮被点击了' + Date.now())
}, 1000)
