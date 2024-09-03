

function splice(array, start, deleteCount, item1, item2,item3){
if ( deleteCount === 0){
    if(item2 === undefined) {

        for (var i = array.length; i > start; i--) {
            array[i] = array[i -1]

        }
        array[start] = item1

        return []
    } else {
        
            var displacements = arguments.length - 3

            for( var i = array.length - 1; i >= start; i--){

                array[i + displacements] = array[i]
            }

            //otra forma, partiendo desde los nuevos elementos a crear
            //for(var i = array.length - 1 + displacementes; i >= star + displacements; i--) {
                //    array[i] = array[i - displacements]  }
            
                for(var i =  3; i < arguments.length; i++){

                    array[start + i - 3] = arguments[i]
                }


        return []
     } 

    }else if (deleteCount === 1){
        


        var extracted = array[start]
        array[start] = item1

        return [extracted]
    } else if (deleteCount === 2) {

        var extracted = []
        for(var i = start; i < start + deleteCount; i++){
            extracted[i - start] = array[i]
        }

        var displacements = arguments.length - 3 - deleteCount //nºdesplazamientos de los elementos del array al insertar los nuevos elementos
        for(var i = array.length - 1; i >= start + deleteCount; i--)
        array[i + displacements] = array[i]

        var insertions = arguments.length - 3
        for(var i = start; i < start + insertions;i++){
            array[i] = arguments[3 + i - start]
        }
        return extracted
    }
}





console.info('CASE insert Feb in array of months')

var months = ['Jan', 'March', 'April', 'June'];

var removed = splice(months, 1, 0, 'Feb')
// Inserts at index 1
console.log(removed);
//[]

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'months at 0 is Jan')
console.assert(months[1] === 'Feb', 'months at 1 is Feb')
console.assert(months[2] === 'March', 'months at 2 is March')
console.assert(months[3] === 'April', 'months at 3 is April')
console.assert(months[4] === 'June', 'months at 3 is Jan')


console.info('CASE replaces one month by another')

var months = ['Jan', 'March', 'April', 'June']

var removed = months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.denug(removed)
//['June']


console.info('CASE insert fish drum in fishes')

const myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
const removed = myFish.splice(2, 0, "drum")
console.debug(removed)
// removed is [], no elements removed
    
console.debug(fishes)
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'angel', 'months at 0 is angel')
console.assert(months[1] === 'clown', 'months at 1 is clown')
console.assert(months[2] === 'drum', 'months at 2 is drum')
console.assert(months[3] === 'mandarin', 'months at 3 is mandarin')
console.assert(months[4] === 'sturgeon', 'months at 3 is sturgeon')



console.info('CASE insert fish drum in fishes')

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
var removed = myFish.splice(2, 0, "drum")
console.debug(removed)
// removed is [], no elements removed
    
console.debug(fishes)
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'angel', 'months at 0 is angel')
console.assert(months[1] === 'clown', 'months at 1 is clown')
console.assert(months[2] === 'drum', 'months at 2 is drum')
console.assert(months[3] === 'mandarin', 'months at 3 is mandarin')
console.assert(months[4] === 'sturgeon', 'months at 4 is sturgeon')


console.info('CASE insert drum and guitar before mandarin')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon]
var removed = fishes.splice(2, 0, 'drum', 'guitar')

// myFish is ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// removed is [], no elements removed

var myFish = ["angel", "clown", "trumpet", "sturgeon"];
var removed = splice(myFish, 0, 2, "parrot", "anemone", "blue");
