debugger

function forEach(array, callback) {
    (function loop(i) { // IIFE & closure
        if (i < array.length) {
            var element = array[i]

            callback(element)

            loop(i + 1)
        }
    })(0)
}

var nums = [10, 20, 30, 40, 50]
forEach(nums, function (num) { console.log(num * 10) })

var chars = ['a', 'b', 'c', 'd', 'e', 'f']
forEach(chars, function (char) { console.log(char.toUpperCase()) })

var people = [{ name: 'Peter', age: 30 }, { name: 'Wendy', age: 29 }]
forEach(people, function (person) { console.log(person.name.toUpperCase()) })

var cart = [{ title: 'socks', quantity: 3, price: 10 }, { title: 't-shirt', quantity: 2, price: 20 }, { title: 'shoes', quantity: 1, price: 50 }]
var total = 0
forEach(cart, function (item) { total += item.quantity * item.price })
console.log(total)

// VM1354:16 100
// VM1354:16 200
// VM1354:16 300
// VM1354:16 400
// VM1354:16 500
// VM1354:19 A
// VM1354:19 B
// VM1354:19 C
// VM1354:19 D
// VM1354:19 E
// VM1354:19 F
// VM1354:22 PETER
// VM1354:22 WENDY
// VM1354:27 120