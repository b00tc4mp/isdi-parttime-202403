function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype
// {}

Person.prototype.fart = function () { return this.name + ': 💨' }

var p = new Person('Peter', 21)
p.fart()
//'Peter: 💨'

var w = new Person('Wendy', 20)
w.fart()
//'Wendy: 💨'

Person.prototype.pee = function () { return this.name + ': 💦' }
p.pee()
//'Peter: 💦'

w.pee()
//'Wendy: 💦'

Person.prototype.poo = function () { return this.name + ': 💩' }
p.poo()
//'Peter: 💩'