//debugger

/*
function forEach(array, i, callback)  {
    if (i < array.length) {
        var element = array[i]

        callback(element)
    
        forEach(array, i + 1, callback)
    }
}
*/

var nums = [10, 20, 30, 40, 50]
//forEach(nums, 0, function(num) { console.log(num * 10) })
nums.forEach(function (num) { console.log(num * 10) }) // Array.prototype.* methods

var chars = ['a', 'b', 'c', 'd', 'e', 'f']
//forEach(chars, 0, function(char) { console.log(char.toUpperCase()) })
chars.forEach(function (char) { console.log(char.toUpperCase()) })

var people = [{ name: 'Peter', age: 30 }, { name: 'Wendy', age: 29 }]
//forEach(people, 0, function(person) { console.log(person.name.toUpperCase()) })
people.forEach(function (person) { console.log(person.name.toUpperCase()) })

var cart = [{ title: 'socks', quantity: 3, price: 10 }, { title: 't-shirt', quantity: 2, price: 20 }, { title: 'shoes', quantity: 1, price: 50 }]
var total = 0
//forEach(cart, 0, function(item) { total += item.quantity * item.price })
cart.forEach(function (item) { total += item.quantity * item.price })
console.log(total)

// VM1335:17 100
// VM1335:17 200
// VM1335:17 300
// VM1335:17 400
// VM1335:17 500
// VM1335:21 A
// VM1335:21 B
// VM1335:21 C
// VM1335:21 D
// VM1335:21 E
// VM1335:21 F
// VM1335:25 PETER
// VM1335:25 WENDY
// VM1335:32 120