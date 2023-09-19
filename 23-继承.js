//ES5
// 定义父类
class Animal {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    console.log(`Hello, I'm ${this.name}`)
  }
}

// 定义子类，并通过extends关键字继承父类
class Dog extends Animal {
  constructor(name, breed) {
    super(name) // 调用父类的构造函数
    this.breed = breed
  }

  bark() {
    console.log(`${this.name} is barking`)
  }
}

// 创建子类实例
const myDog = new Dog('Buddy', 'Golden Retriever')

myDog.sayHello() // 调用父类的方法
myDog.bark() // 调用子类的方法

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
