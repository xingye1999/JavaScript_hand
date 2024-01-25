Function.prototype.myCall = function (context, ...arg) {
  context = context || window
  context.fn = this
  let result = context.fn(...arg)
  delete context.fn
  return result
}

var age = 10
var obj = {
  age: 20,
}
function foo(a, b) {
  console.log(this.age + a + b)
}

foo(3, 4) // => NAN
foo.myCall(obj, 3, 4) //=> 27
