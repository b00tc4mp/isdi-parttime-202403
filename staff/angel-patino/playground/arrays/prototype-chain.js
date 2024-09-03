function Animal (name, age) {
    this.name = name
    this.age = age
}

Animal.prototype.fart = function (){ return this.name + ': 💨'}
Animal.prototype.poo = function() {return this.name + ': 💩'}

function Human(name, age) {
    Animal.call(this, name, age)

}

Human.prototype = Object.create(Animal.prototype)
Human.prototype.constructor = Human

Human.prototype.pray = function() {return this.name + ': 🙏'}

function Woman (name, age) {
    Human.call(this, name, age)
}

Woman.prototype = Object.create(Human.prototype)
Woman.prototype.constructor = Woman

Woman.prototype.giveBirth = function() { return this.name + ': 👩‍🍼'}

function Man (name, age){
    Human.call(this, name, age)
}

Man.prototype = Object.create(Human.prototype)
Man.prototype.create = Man

Man.prototype.giveSperm = function () {return this.name + ': ❤'}

var cat = new Animal('Garfield', 33)
console.log(cat.fart())

var peter = new Man('Juanito', 33)
console.log(peter.giveSperm())

var wendy = new Woman('Wendy', 44)
console.log(wendy.giveBirth())