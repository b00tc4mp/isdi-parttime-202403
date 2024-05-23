delete Array.prototype.findIndex

function findIndex(array, callback){

    for(var i = 0; i < array.length; i++){
        if(callback(array[i]))
            return i
    }
    return -1
}

console.info('CASE return first element true')

var num = [5, 12, 8, 130, 44];

var isLargeNumber = (element) => element > 13;

console.log(findIndex(num, isLargeNumber));
// Expected output: 3

console.info('CASE return first element true')

var num2 = [5, 12, 8, 11, 9];

var isLargeNumber2 = (element) => element > 13;

console.log(findIndex(num2, isLargeNumber2));
// Output: -1

console.info('CASE search the object in the array')

var fruits = ["apple", "banana", "cantaloupe", "blueberries", "grapefruit"];

var index = findIndex(fruits, function(fruit) { return fruit === "blueberries"} );

console.log(index); // 3
console.log(fruits[index]); // blueberries