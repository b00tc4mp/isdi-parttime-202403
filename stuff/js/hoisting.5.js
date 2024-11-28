var add // undefined

var r = add(1, 2)
console.log(r)

add = function (a, b) { return a + b }
// VM323:3 Uncaught TypeError: add is not a function
//     at <anonymous>:3:9