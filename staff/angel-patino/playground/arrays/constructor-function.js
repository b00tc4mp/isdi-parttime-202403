function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype
Person.prototype.fart = function() { return this.name + ':💨' }

var p = new Person('Peter', 22)

console.log(p.fart())
//Peter:💨

var w = new Person('Wendy', 33)
w.fart()
//Wendy:💨

Person.prototype.pee = function() {return this.name + ': 🚾'}
console.log(p.pee())

Person.prototype.poo = function() {return this.name + ': 💩'}
w.poo()
console.log(w.poo())