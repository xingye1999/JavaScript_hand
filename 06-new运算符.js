function myNew(func, ...args) {
    //创建一个空对象
    const obj = {}
    //设置原型 
    obj.__proto__ =  func.prototype
    //让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
    const res = func.call(obj, ...args)
    //如果构造函数返回了一个对象，则返回该对象；否则，返回新创建的对象。
    return typeof res === 'object' ? res : obj
}