function add(a, b) { return a + b }

var r = add(1, 2)
console.log(r)
// 3

/////////////////////////////

var r = add(1, 2)
console.log(r)

function add(a, b) { return a + b } // compact function definition with name and value
//3

////////////////////////

var add = function (a, b) { return a + b }

var r = add(1, 2)
console.log(r)
//3

/////////////////////////////

add = function (a, b) { return a + b }

var r = add(1, 2)
console.log(r)

var add
// 3

///////////////////////////////

add = function (a, b) { return a + b }

var r = add(1, 2)
console.log(r)

var add
// 3

//////////////////////

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