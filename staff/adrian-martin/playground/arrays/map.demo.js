delete Array.prototype.map

function map(array, callback){

    var mapped = []

    for(var i = 0; i < array.length;i++){
        var element = array[i]

        var mappedElement = callback(element, i, array) 

        mapped[i] = mappedElement
    }

    return mapped
}


console.info('CASE nums by 2')

var nums = [1, 4, 9, 16];

var numsBy2 = map(nums, function (num) { return num * 2} );

console.debug(nums)

console.debug(numsBy2);

console.info('CASE names yo uppercase')

var names = ['ADRiAn', 'IÑaKI', 'jESUs','ISMael']

var normalnames = map(names, function (nombre) { console.log(nombre.toUpperCase())})

console.info('CASE map elements and other arguments into objects')

var colors = ['red', 'blue', 'black', 'green']

var data = map(colors, function(color, index, colors){
    var o = {color: color, index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)