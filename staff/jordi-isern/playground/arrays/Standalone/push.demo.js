function push(array, element ){
    for(var i = 1; i < arguments.length; i++){
        var argument = arguments[i]
    array[array.length] = argument
    }
    return array.length
}






console.info('CASE add animal to array')
var animals = ['pigs', 'goats', 'sheep'];

var count = push(animals,'cows');
console.debug(count);
// Expected output: 4

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]


console.info('CASE add various animals to array')
var count = push(animals,'chickens', 'cats', 'dogs');

console.debug(count)

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]



console.info('CASE add no element to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = push(animals)

console.debug(count)
// 4

console.debug(animals)
// ['pigs', 'goats', 'sheep', 'cows']