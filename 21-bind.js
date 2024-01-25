Function.prototype.myBind = function (context, ...arg) {
  context = context || window
  let fn = this
  return function () {
    context.fn = fn
    let result = context.fn(...arg, ...arguments)
    delete context.fn
    return result
  }
}

var age = 10
var obj = {
  age: 20,
}
function foo(a, b, c) {
  console.log(this.age)
  console.log(a)
  console.log(b)
  console.log(c)
  return 110
}

foo(3, 4)
console.log("-------")
foo.myBind(obj)(5)
console.log("-------")
foo.myBind(obj, 1)(5)
console.log("-------")
console.log(foo.myBind(obj)(5))

//方法2：更加完善
// 自定义简陋版bind方法实现
Function.prototype.myBind = function (context, ...args) {
  // 如果没有传入上下文对象，则默认为全局对象window
  context = context || window
  // 保存原始函数的引用，this就是要绑定的函数
  const _this = this
  // 返回一个新的函数作为绑定函数
  return function fn() {
    // 判断返回出去的函数有没有被new
    if (this instanceof fn) {
      return new _this(...args, ...arguments)
    }
    // 使用 apply 方法将原函数绑定到指定的上下文对象上
    return _this.apply(context, [...args, ...arguments])
  }
}

//测试
function sayHello(x, y, z) {
  console.log("函数中的this: ", this)
  console.log("你好, " + this.name)
  console.log(x + y + z)
}
let person = { name: "张三" }
let bind1 = sayHello.myBind(person, 1, 2, 3)
console.log(bind1())
console.log("----")
console.log(new bind1())
