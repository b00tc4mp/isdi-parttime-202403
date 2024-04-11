function splice(array, start, deletecount, item1) {
    if(deletecount === 0) {
        //array --> ['Jan', 'March', 'April', 'June']
        //start --> 1
        //deletecount --> 0
        //item --> 'Feb'

        //array[array.length] = array[array.length -1]
        //array[array.length -2 ] = array[array.length -3]
        //array[array.length -3 ] = array[array.length -4]
        //array[start] = item1 

        for (var i = array.length; i>start; i--) {
                array[i] = array[i-1]
        }
        array[start] = item1
        return []
    }else if (deletecount === 1) {
        //array --> ['Jan', 'March', 'April', 'June']
        //start --> 4
        //deletecount --> 1
        //item --> 'May'
        var extracted = array[start]


    }
}   

console.info('Case insert Feb in array of months')

var months = ['Jan', 'March', 'April', 'June'];

var removed = months.splice(1, 0, 'Feb');
// Inserts at index 1
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

console.assert(months.length === 5, 'length is 5')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'June', 'month at 1 is June')



console.info('CASE replaces one month by another')


var months= 
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

