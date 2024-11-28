delete Array.prototype.splice

function splice(array, start, deleteCount, item1){
    //array--> ['Jan', 'March', 'April', 'June']
    //start--> 1
    //deleteCount--> 0
    //item--> 'Feb'

    // array[4] = array[3] //array--> ['Jan', 'March', 'April', 'June', 'June']
    // array[3] = array[2] //array--> ['Jan', 'March', 'April', 'April', 'June']
    // array[2] = array[1] //array--> ['Jan', 'March', 'March', 'April', 'June']
    //  array[start] = item1

    for( var i = array.length; i > start; i--) {
        array[i] = array[i - 1]
    }

    array[start] = item1
    
    return []
}

console.info('CAE insert Feb in array of months')

var months = ['Jan', 'March', 'April', 'June']

var removed = splice(months, 1, 0, 'Feb')
//Inserts at index 1
console.log(removed)
//[]
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(months)
//Expect output: Array ['Jan', 'Feb', 'March', 'April', 'June']
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'June', 'month at 4 is June')