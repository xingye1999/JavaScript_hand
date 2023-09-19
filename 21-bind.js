Function.prototype.myBind = function (context, ...arg) {
  context = context === null || context === undefined ? window : Object(context)
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
  age: 20
}
function foo(a, b, c) {
  console.log(this.age)
  console.log(a)
  console.log(b)
  console.log(c)
  return 110
}

foo(3, 4)
console.log('-------')
foo.myBind(obj)(5)
console.log('-------')
foo.myBind(obj, 1)(5)
console.log('-------')
console.log(foo.myBind(obj)(5))
