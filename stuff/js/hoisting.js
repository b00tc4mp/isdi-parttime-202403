var r = add(1, 2)
console.log(r)

var add = function (a, b) { return a + b }
// VM378:1 Uncaught TypeError: add is not a function
//     at <anonymous>:1:9

// doesn't matter if arrow function (or not)ç

var r = add(1, 2)
console.log(r)

var add = (a, b) => a + b
// VM432: 1 Uncaught TypeError: add is not a function
//     at<anonymous>: 1: 9

