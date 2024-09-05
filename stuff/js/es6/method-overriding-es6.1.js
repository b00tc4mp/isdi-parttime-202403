// Object

Object.prototype.genealogy = function () {
    return '⭕️ -> null'
}

// Object -> Animal

class Animal extends Object {
    constructor(name, age) {
        super()

        this.name = name
        this.age = age
    }

    // override
    toString() {
        return this.constructor.name + ' { ' + this.name + ', ' + this.age + ' }'
    }

    genealogy() {
        //return '🐷 -> ⭕ -> null'
        return '🐷 -> ' + super.genealogy()
    }
}

// Animal -> Person

class Person extends Animal {
    constructor(name, age) {
        super(name, age)
    }

    // override
    toString() {
        return this.constructor.name + ' < ' + this.name + ', ' + this.age + ' >'
    }

    genealogy() {
        //return '😊 -> 🐷 -> ⭕ -> null'
        return '😊 -> ' + super.genealogy()
    }
}

//var peter = new Animal('Peter', 22)
var peter = new Person('Peter', 22)

//console.log('hola ' + peter.toString())
console.log('hola ' + peter)

console.log(peter.genealogy())

