delete Array.prototype.splice

function splice(array, start, deleteCount, item1, item2){
    if (deleteCount === 0){
        if(item2 === undefined){
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
        }else {
            // array--> ['angel', 'clown', 'mandarin', 'stugeon']
            //start--> 2
            //deleteCount--> 0
            //item1-->'drum'
            //item2--> 'guitar'

        

            // array[5] = array[3] // array--> ['angel', 'clown', 'mandarin', 'stugeon', <empty>, 'stugeon']
            // array[4] = array[2] // array--> ['angel', 'clown', 'mandarin', 'stugeon', 'mandarin', 'stugeon']

            var displacemant = arguments.length - 3

            for (var i = array.length-1; i >= start; i--){
                array[i + displacemant] = array[i]
            }

            // array[2] = item1
            // array[3] = item2

            for (var i = 3; i < arguments.length; i++){
                array[start + i - 3] = arguments[i]

            }

            return[]
        }
        

    }else if (deleteCount === 1) {
        var extracted = array[start] // 'June'

        array[start] = item1
        
        return [extracted]
    }

    
}

console.info('CAE insert Feb in array of months')

var fishes = ['Jan', 'March', 'April', 'June']

var removed = splice(fishes, 1, 0, 'Feb')
//Inserts at index 1
console.log(removed)
//[]
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(fishes)
//Expect output: Array ['Jan', 'Feb', 'March', 'April', 'June']
console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === 'Jan', 'month at 0 is Jan')
console.assert(fishes[1] === 'Feb', 'month at 1 is Feb')
console.assert(fishes[2] === 'March', 'month at 2 is March')
console.assert(fishes[3] === 'April', 'month at 3 is April')
console.assert(fishes[4] === 'June', 'month at 4 is June')


console.info('CASE replace one month by another')

var fishes = ['Jan', 'Feb', 'March', 'April', 'June']

var removed = splice(fishes, 4, 1, 'May')
//replace 1 element at index 4
console.debug(removed)
//['June']
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 1, 'removed length is 1')
console.assert(removed[0] === 'June', 'removed element is June')


console.log(fishes)
//output: ['Jan', 'Feb' 'March', 'April', 'May']
console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === 'Jan', 'month at 0 is Jan')
console.assert(fishes[1] === 'Feb', 'month at 1 is Feb')
console.assert(fishes[2] === 'March', 'month at 2 is March')
console.assert(fishes[3] === 'April', 'month at 3 is April')
console.assert(fishes[4] === 'May', 'month at 4 is May')


console.info('CASE insert fish drum in fishes')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon']

var removed = splice(fishes, 2, 0, 'drum')

console.debug(removed)
//removed is [], no elements removed
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(fishes)
//output: ['angel', 'clown', 'drum', 'Mandarin', 'sturgeon']
console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === 'angel', 'fish at 0 is angel')
console.assert(fishes[1] === 'clown', 'fish at 1 is clown')
console.assert(fishes[2] === 'drum', 'fish at 2 is drum')
console.assert(fishes[3] === 'mandarin', 'fish at 3 is mandarin')
console.assert(fishes[4] === 'sturgeon', 'fish at 4 is sturgeon')


console.info('CASE insert fishes drum and guitar before mandarin')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon']

var removed = splice(fishes, 2, 0, 'drum', 'guitar')

console.debug(removed)
//removed is [], no elements removed
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(fishes)
//output: ['angel', 'clown', 'drum', 'Mandarin', 'sturgeon']
console.assert(fishes.length === 6, 'length is 6')
console.assert(fishes[0] === 'angel', 'fish at 0 is angel')
console.assert(fishes[1] === 'clown', 'fish at 1 is clown')
console.assert(fishes[2] === 'drum', 'fish at 2 is drum')
console.assert(fishes[3] === 'guitar', 'fish at 3 is guitar')
console.assert(fishes[4] === 'mandarin', 'fish at 3 is mandarin')
console.assert(fishes[5] === 'sturgeon', 'fish at 4 is sturgeon')