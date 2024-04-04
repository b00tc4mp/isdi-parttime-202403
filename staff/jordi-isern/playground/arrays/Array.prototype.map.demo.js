var nums = [1, 4, 9, 16];

// Pass a function to map
var numsBy2 = nums.map(function (num ){return num * 2});
console.log(nums)
console.log(numsBy2);
// Expected output: Array [2, 8, 18, 32]



console.info('CASE map element and other arguments into objects')

var color = ['red', 'green', 'blue', 'yellow']

var data = color.map(function(color, index,colors){
    var o = {color: color,index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)