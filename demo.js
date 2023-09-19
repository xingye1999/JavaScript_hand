function Animal(name) {
  this.name = name
}
Animal.prototype.sayHello = function () {
  console.log(this.name)
}

function Dog(name, bread) {
  Animal.call(this, name)
  this.bread = bread
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.sayBread = function () {
  console.log(this.name, this.bread)
}

const dog = new Dog('a', 'b')

dog.sayHello()
dog.sayBread()
