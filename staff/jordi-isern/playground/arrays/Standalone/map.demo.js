
function map (array, callback){

    var mapped = []

    for (var i = 0; i < array.length; i++){
        element = array[i]
    
        var mappedElement =    callback(element, i ,array)
        mapped[i] = mappedElement
    }
    return mapped
}


console.info('Case num by 2')

var nums = [1, 4, 9, 16];
numsBy2 = []
map(nums, function (num, j){numsBy2[j] = num *2})

console.debug(numsBy2)


console.info('CASE map element and other arguments into objects')

var colors = ['red', 'green', 'blue', 'yellow']

var data = map(colors,function (color, index, colors){
    var object = { color: color ,index: index, colors: colors }
    return object
})

console.debug(data)
console.table(data)
