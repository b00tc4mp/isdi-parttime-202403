function Animal(name, age) {
    this.name = name
    this.age = age
}

Animal.prototype.fart = function () { return this.name + ': 💨' }
Animal.prototype.pee = function () { return this.name + ': 💦' }
Animal.prototype.poo = function () { return this.name + ': 💩' }


function Human(name, age) {
    Animal.call(this, name, age)
}

Human.prototype = Object.create(Animal.prototype)
Human.prototype.constructor = Human

Human.prototype.pray = function () { return this.name + ': 🙏' }


function Woman(name, age) {
    Human.call(this, name, age)
}

Woman.prototype = Object.create(Human.prototype)
Woman.prototype.constructor = Woman

Woman.prototype.giveBirth = function () { return this.name + ': 👶🏼' }


function Man(name, age) {
    Human.call(this, name, age)
}

Man.prototype = Object.create(Human.prototype)
Man.prototype.constructor = Man

Man.prototype.giveSperm = function () { return this.name + ': 🤍' }

var kitty = new Animal('Garfield', 20)
console.log(kitty.poo())
//console.log(kitty.pray())

var peter = new Human('Peter', 20)
//var peter = new Man('Peter', 20)
console.log(peter.giveSperm())
console.log(peter.poo())
console.log(peter.pray())

var wendy = new Woman('Wendy', 19)
console.log(wendy.giveBirth())
console.log(peter.poo())
console.log(wendy.pray())


