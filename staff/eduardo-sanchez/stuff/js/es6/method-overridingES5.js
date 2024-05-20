//Object

Object.prototype.genealogy = function () {
    return '⭕️ -> null'
}

//Object -> Animal

function Animal(name, age) {
    this.name = name
    this.age = age

}

//override
Animal.prototype.toString = function () {
    return this.constructor.name + ' { ' + this.name + ', ' + this.age + ' } '
}

Animal.prototype.genealogy = function () {
    //return '🐷 -> ⭕ -> null'
    return '🐷 -> ' + Object.prototype.genealogy.call(this)
}

// Animal -> Person

function Person(name, age) {
    Animal.call(this, name, age)
}

Person.prototype = Object.create(Animal.prototype)
Person.prototype.constructor = Person

//override
Person.prototype.toString = function () {
    return this.constructor.name + ' < ' + this.name + ', ' + this.age + ' > '
}

Person.prototype.genealogy = function () {
    //return '😊 -> 🐷 -> ⭕ -> null'
    return '😊 -> ' + Animal.prototype.genealogy.call(this)
}

// var peter = new Animal('Peter', 22)

var peter = new Person('Peter', 22)


//console.log('hola ' + peter.toString())
console.log('hola ' + peter)

console.log(peter.genealogy())