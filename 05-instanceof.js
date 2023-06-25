// 手写instanceof

function myInstanceof(object, constructor) {
    // 基本数据类型都返回false
    if (typeof object !== 'object' || object === null) return false
    // 获取对象原型
    let proto = Object.getPrototypeOf(object)
    while(true) {
        // 假设找到顶端了，返回false
        if (proto === null) return false
        // 假设相等，返回true
        if (proto === constructor.prototype) return true
        // 一直顺着__proto__找下去
        proto = Object.getPrototypeOf(proto)
    }
}

function Person() {}

const person = new Person();

console.log(myInstanceof(person, Person));  // 输出: true
console.log(myInstanceof(person, Object));  // 输出: true
console.log(myInstanceof(person, Array));   // 输出: false
