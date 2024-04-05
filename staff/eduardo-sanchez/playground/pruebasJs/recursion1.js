function forEach(array, i, callback) {
    if (i < array.length) {
        var element = array[i]

        callback(element)

        forEach(array, i + 1, callback)
    }
}

var nums = [10, 20, 30, 40, 50]
forEach(nums, 0, function (num) { console.log(num * 10) }) // callbacks (declarative)

var chars = ['a', 'b', 'c', 'd', 'e', 'f']
forEach(chars, 0, function (char) { console.log(char.toUpperCase()) })

var people = [{ name: 'Peter', age: 30 }, { name: 'Wendy', age: 29 }]
forEach(people, 0, function (person) { console.log(person.name.toUpperCase()) })

var cart = [{ title: 'socks', quantity: 3, price: 10 }, { title: 't-shirt', quantity: 2, price: 20 }, { title: 'shoes', quantity: 1, price: 50 }]
var total = 0
forEach(cart, 0, function (item) { total += item.quantity * item.price })
console.log(total)

// VM1183:14 100
// VM1183:14 200
// VM1183:14 300
// VM1183:14 400
// VM1183:14 500
// VM1183:17 A
// VM1183:17 B
// VM1183:17 C
// VM1183:17 D
// VM1183:17 E
// VM1183:17 F
// VM1183:20 PETER
// VM1183:20 WENDY
// VM1183:25 120