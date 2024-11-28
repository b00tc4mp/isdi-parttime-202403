var peter = {
    name: 'Peter',
    salute: function (to) {
        return `${this.name}: ${to}!`
    }
}

peter.salute('Wendy')
// 'Peter: Wendy!'

var peter = {
    name: 'Peter',
    salute: to => {
        return `${this.name}: ${to}!`
    }
}

peter.salute('Wendy')
// ': Wendy!'


var peter = {
    name: 'Peter',
    salute: to => `${this.name}: ${to}!`
}

peter.salute('Wendy')
// ': Wendy!'


var peter = {
    name: 'Peter',
    salute: function (to) {
        return `${this.name}: ${to}!`
    }.bind(this)
}

peter.salute('Wendy')
// ': Wendy!'

window.name
//''