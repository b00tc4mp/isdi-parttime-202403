debugger

function forEach(array, callback) {
    var i = 0

    function loop() { // closure
        if (i < array.length) {
            var element = array[i]

            callback(element)

            i++ // i = i + 1

            loop()
        }
    }

    loop()
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