/*const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]*/


console.info("CASE names to uppercase")

console.info("CASE map elements and other arguments into objects")

var colors = ["red", "green", "blue", "yellow"]

var data = colors.map(function (color, index, colors) {

        var o = {color: color, index: index, colors: colors}

        return o

})

