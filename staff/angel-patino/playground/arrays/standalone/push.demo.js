delete Array.prototype.push
console.info('CASE add animal to array')


/*function push(array, element) {
    array[array.length] = element
    return array.length
}

*/

//arguments is an array-like object accessible inside functions that contains the values of the arguments passed to that function.
function push(array){

    for(var i = 1; i < arguments.length; i++){ 
        var value = arguments[i]
       array[array.length] = value
       }
return array.length
}



console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep'];

var count = push(animals, 'cows');
console.debug(count);
// Expected output: 4
console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]


console.info('CASE add varius animals to array')

var animals = ['pigs', 'goats', 'sheep'];
push(animals, 'chickens', 'cats', 'dogs');

console.assert(count === 4, 'count is 4')

console.debug(count)
// 7
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

var sports = ["soccer", "baseball"]
var total = ["footbal","swimming"]
var newArray = push(sports,total)

console.table(newArray)
console.log(newArray)
