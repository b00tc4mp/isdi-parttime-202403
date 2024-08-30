delete Array.prototype.concat


/* function concat(array1, array2) {
    var array3 = []
    array3[0] = array1[0]
    array3[1] = array1[1]
    array3[2] = array1[2]
    array3[3] = array2[0]
    array3[4] = array2[1]
    array3[5] = array2[2]

    return array3
} */

function concat() {
    var array3 = []
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var element = arguments[i][j]
            array3[array3.length] = element
        }
    }

    return array3
}

console.info("CASE concat two arrays")

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = concat(array1, array2);


console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]


console.assert(array3[0] === "a", "index 0 is a")
console.assert(array3[1] === "b", "index 1 is b")
console.assert(array3[2] === "c", "index 2 is c")
console.assert(array3[3] === "d", "index 3 is d")
console.assert(array3[4] === "e", "index 4 is e")
console.assert(array3[5] === "f", "index 5 is f")
console.assert(array3.length === 6, "length is 6")
console.assert(array3 instanceof Array, "array 3 is an instance of Array")

console.info("CASE concat three arrays")

var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array4 = ['g', 'h', 'i'];

var array3 = concat(array1, array2, array4);


console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

console.assert(array3[0] === "a", "index 0 is a")
console.assert(array3[1] === "b", "index 1 is b")
console.assert(array3[2] === "c", "index 2 is c")
console.assert(array3[3] === "d", "index 3 is d")
console.assert(array3[4] === "e", "index 4 is e")
console.assert(array3[5] === "f", "index 5 is f")
console.assert(array3[6] === "g", "index 6 is g")
console.assert(array3[7] === "h", "index 7 is h")
console.assert(array3[8] === "i", "index 8 is i")
console.assert(array3.length === 9, "length is 9")
console.assert(array3 instanceof Array, "array 3 is an instance of Array")

console.info("CASE concat with 1 array")

var array1 = ['a', 'b', 'c'];

var array3 = concat(array1);


console.log(array3);
// Expected output: Array ["a", "b", "c"]

console.assert(array3[0] === "a", "index 0 is a")
console.assert(array3[1] === "b", "index 1 is b")
console.assert(array3[2] === "c", "index 2 is c")
console.assert(array3.length === 3, "length is 3")
console.assert(array3 instanceof Array, "array 3 is an instance of Array")