Function.prototype.myApply = function (context, arr) {
  // 1. 判断上下文类型, 如果是undefined或者null指向window, 否则使用Object()将上下文包装成对象
  context = context === undefined || context === null ? window : Object(context)
  //  如何把函数foo的this指向context这个上下文呢
  // 2. 把函数foo赋值给对象context的一个属性, 用这个对象context去调用foo，这样this就指向了这个对象context
  context.fn = this
  // 3. 调用需要被执行的函数
  let result = context.fn(...arr)
  delete context.fn
  return result
}

var age = 10
var obj = {
  age: 20
}
function foo(a, b) {
  console.log(this.age + a + b)
}

foo(3, 4) // => NAN
foo.myApply(obj, [3, 4]) //=> 27
