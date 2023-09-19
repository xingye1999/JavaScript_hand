//ES5
// 定义父类
// 父对象的构造函数
function Animal(name) {
  this.name = name
}

// 父对象的原型方法
Animal.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`)
}

// 子对象的构造函数
function Dog(name, breed) {
  Animal.call(this, name) // 调用父对象的构造函数
  this.breed = breed
}

// 将父对象的实例设置为子对象的原型
Dog.prototype = Object.create(Animal.prototype)

// 子对象自己的方法
Dog.prototype.bark = function () {
  console.log(`${this.name} is barking`)
}

// 创建子对象实例
const myDog = new Dog('Buddy', 'Golden Retriever')

myDog.sayHello() // 调用父对象的方法
myDog.bark() // 调用子对象的方法

//ES6
// class Animal {
//   constructor(name) {
//     this.name = name
//   }
//   getName() {
//     return this.name
//   }
// }

// class Dog extends Animal {
//   constructor(name, age) {
//     super(name)
//     this.age = age
//   }
// }

// const dog = new Dog('job', 12)
// console.log(dog.getName())
