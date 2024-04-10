// Recrear el metodo splice

function splice(array, start, deleteCount, item1, item2, item3) {
  if (deleteCount === 0) {
    // if (item2 === undefined) { // array -> ['Jan', 'March', 'April', 'June']
    //* Case 1--

    // start -> 1
    //deleteCount -> 0
    // item -> 'Feb'

    //array[3] = array[2] // ['Jan', 'March', 'April', 'April', 'June']
    //array[2] = array[1] // ['Jan', 'March', 'March', 'April', 'June']
    //array[4] = array[3] // ['Jan', 'March', 'April', 'June', 'June']
    //array[1] = item1    // ['Jan', 'Feb', 'March', 'April', 'June']

    // for (var i = array.length; i > start; i--) {
    //   array[i] = array[i - 1]
    //    }

    //  array[start] = item1

    //  return []
    //  } else {

    //* Case 3--
    // array -> ['angel', 'clown', 'mandarin', 'sturgeon']
    // start -> 2
    // deleteCount -> 0
    // item1 -> 'drum'
    // item2 -> 'guitar'



    //array[5] = array[3] // ['angel', 'clown', 'mandarin', 'sturgeon', <empty>, 'sturgeon' ]
    //array[4] = array[2] // ['angel', 'clown', 'mandarin', 'sturgeon', mandarin, 'sturgeon' ]

    var displacements = arguments.length - 3
    for (var i = array.length - 1; i >= start; i--) {
      array[i + displacements] = array[i]
    }

    //array[2] = item1 // ['angel', 'clown', 'drum', 'sturgeon', mandarin, 'sturgeon' ]
    //array[3] = item2 // ['angel', 'clown', 'drum', 'guitar', mandarin, 'sturgeon' ]

    for (var i = 3; i < arguments.length; i++) {
      array[start + i - 3] = arguments[i]
    }

    return []

  } else if (deleteCount === 1) {
    //* Case 2--
    // array -> ['Jan', 'Feb', 'March', 'April', 'June']
    // start -> 4
    // deleteCount -> 1
    // item1 -> 'May'

    var extracted = array[start] //se almacena en una variable porque tiene que devolver ese elemento eliminado, si no hay elemento devuelve un array vacío
    array[start] = item1 //en la posicion start se modifica por el item1 que es el que queremos añadir.

    return [extracted]

  } else if (deleteCount === 2) {
    // array -> ['angel', clown', 'trumpet', 'sturgeon']
    //start -> 0
    //deleteCount -> 2
    // item1, item2, item3 -> 'parrot', 'anemone', 'blue'

    var extracted = []
    //extracted[0] = array[0]
    //extracted[1] = array[1]
    for (var i = start; i < start + deleteCount; i++) {
      extracted[i - start] = array[i]
    }



    //array[4] = array[3] // array -> ['angel', clown', 'trumpet', 'sturgeon', 'sturgeon']
    //array[3] = array[2] // array -> ['angel', clown', 'trumpet', 'trumpet', 'sturgeon']

    var displacements = arguments.length - 3 - deleteCount
    for (var i = array.length - 1; i >= start + deleteCount; i--) {
      array[i + displacements] = array[i]
    }

    //array[0] = item1 // array -> ['parrot', clown', 'trumpet', 'trumpet', 'sturgeon']
    //array[1] = item2 // array -> ['parrot', anemone', 'trumpet', 'trumpet', 'sturgeon']
    //array[2] = item3 // array -> ['parrot', anemone', 'blue', 'trumpet', 'sturgeon']

    var insertions = arguments.length - 3
    for (var i = start; i < start + insertions; i++) {
      array[start + i] = arguments[3 + i - start]

    }

    return extracted
  }
}

console.info('--- CASE 1 inserts Feb in array of months ---')

var months = ['Jan', 'March', 'April', 'June']
var removed = splice(months, 1, 0, 'Feb')
// Inserts at index 1
console.debug(removed)
// Expected output: []
console.log(months);
// Expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

//! TEST ASSERT

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'June', 'month at 4 is June')

//? ------------------------------------------------------------

console.info('--- CASE 2 replace June for May ---')

var months = ['Jan', 'Feb', 'March', 'April', 'June'];

var removed = splice(months, 4, 1, 'May');
// Replaces 1 element at index 4
console.debug(removed)
// output: ['June']

console.log(months);
// Expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

//! TEST ASSERT
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 1, 'removed length is 1')
console.assert(removed[0] === 'June', 'removed element is June')

console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'May', 'month at 4 is May')

//? -------------------------------------------------------------------------


console.info('--- CASE 1 insert fish drum in fishes ---')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon']
var removed = splice(fishes, 2, 0, 'drum')

console.log(removed)
// removed is [], no elements removed

console.log(fishes)
// fishes is ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']

//! TEST ASSERT

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === 'angel', 'fish at 0 is angel')
console.assert(fishes[1] === 'clown', 'fish at 1 is clown')
console.assert(fishes[2] === 'drum', 'fish at 2 is drum')
console.assert(fishes[3] === 'mandarin', 'fish at 3 is mandarin')
console.assert(fishes[4] === 'sturgeon', 'fish at 4 is sturgeon')

//?--------------------------------------------------------------------

console.log('--- CASE 3 inserts drum and guitar before mandarin')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = splice(fishes, 2, 0, 'drum', 'guitar');

// removed is [], no elements removed
console.log(removed)

console.log(fishes)
// fishes is ['angel', 'clown', 'drum', 'guitar', 'mandarin', 'sturgeon']

//! TEST ASSERT

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.assert(fishes.length === 6, 'length is 6')
console.assert(fishes[0] === 'angel', 'fish at 0 is angel')
console.assert(fishes[1] === 'clown', 'fish at 1 is clown')
console.assert(fishes[2] === 'drum', 'fish at 2 is drum')
console.assert(fishes[3] === 'guitar', 'fish at 3 is guitar')
console.assert(fishes[4] === 'mandarin', 'fish at 4 is mandarin')
console.assert(fishes[5] === 'sturgeon', 'fish at 4 is sturgeon')


//? --------------------------------------------------------------------

console.log('--- CASE 3 inserts drum, guitar, flute and microphone before angel')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = splice(fishes, 1, 0, 'drum', 'guitar', 'flute', 'microphone');

// removed is [], no elements removed
console.log(removed)

console.log(fishes)
// fishes is ['angel', 'drum', 'guitar', 'flute', 'microphone','clown', 'mandarin', 'sturgeon']

//! TEST ASSERT

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')
console.assert(fishes.length === 8, 'length is 8')
console.assert(fishes[0] === 'angel', 'fish at 0 is angel')
console.assert(fishes[1] === 'drum', 'fish at 1 is drum')
console.assert(fishes[2] === 'guitar', 'fish at 2 is guitar')
console.assert(fishes[3] === 'flute', 'fish at 3 is flute')
console.assert(fishes[4] === 'microphone', 'fish at 4 is microphone')
console.assert(fishes[5] === 'clown', 'fish at 5 is clown')
console.assert(fishes[6] === 'mandarin', 'fish at 6 is mandarin')
console.assert(fishes[7] === 'sturgeon', 'fish at 7 is sturgeon')

//? -------------------------------------------------------------------------

console.info('Demo replace angel and clown with parrot, anemone, and blue')

var fishes = ["angel", 'clown', 'trumpet', 'sturgeon']
var removed = splice(fishes, 0, 2, 'parrot', 'anemone', 'blue')

console.log(removed)
// removed is ['angel'], ['clown']

console.log(fishes)


//! TEST ASSERT 
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 2, 'removed length is 2')
console.assert(removed[0] === 'angel', 'removed at 0 is angel')
console.assert(removed[1] === 'clown', 'removed at 1 is clown')

console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === 'parrot', 'fish at 0 is parrot')
console.assert(fishes[1] === 'anemone', 'fish at 1 is anemone')
console.assert(fishes[2] === 'blue', 'fish at 2 is blue')
console.assert(fishes[3] === 'trumpet', 'fish at 3 is trumpet')
console.assert(fishes[4] === 'sturgeon', 'fish at 4 is sturgeon')