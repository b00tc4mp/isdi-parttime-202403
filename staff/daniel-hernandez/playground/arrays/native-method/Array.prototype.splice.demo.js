// tests
var months = [ 'Jan', 'Feb', 'March', 'April', 'June' ];
var removed = months.splice(4, 0, 'May');
// inserts at index 4
console.log(months);
// expected output: [ 'Jan', 'Feb', 'March', 'April', 'May', 'June' ]
console.log(removed);
// expected output: []
// assert
console.assert(months.length === 6, 'months array length is incorrect');
console.assert(months[0] === 'Jan', 'element at index 0 is incorrect');
console.assert(months[1] === 'Feb', 'element at index 1 is incorrect');
console.assert(months[2] === 'March', 'element at index 2 is incorrect');
console.assert(months[3] === 'April', 'element at index 3 is incorrect');
console.assert(months[4] === 'May', 'element at index 4 is incorrect');
console.assert(months[5] === 'June', 'element at index 5 is incorrect');
console.assert(Array.isArray(removed), 'removed is not an array');
console.assert(removed.length === 0, 'removed is not empty');

// another case V
months = [ 'Jan', 'Feb', 'March', 'April', 'June' ];
removed = months.splice(4, 1, 'May');
// replaces element at index 4 with 'May'
console.log(months);
// expected output [ 'Jan', 'Feb', 'March', 'April', 'May' ]
console.log(removed);
// expected output [ 'June' ]
// assert
console.assert(months.length === 5, 'months length is incorrect');
console.assert(months[0] === 'Jan', 'element at index 0 is incorrect');
console.assert(months[1] === 'Feb', 'element at index 1 is incorrect');
console.assert(months[2] === 'March', 'element at index 2 is incorrect');
console.assert(months[3] === 'April', 'element at index 3 is incorrect');
console.assert(months[4] === 'May', 'element at index 4 is incorrect');
console.assert(Array.isArray(removed), 'removed is not an array');
console.assert(removed.length === 1, 'removed length is incorrect');
console.assert(removed[0] === 'June', 'removed element is not June');

// another case V
var myFish = [ 'angel', 'clown', 'mandarin', 'sturgeon' ];
var removed = myFish.splice(2, 0, 'drum', 'guitar');
// inserts at index 2 and 3
console.log(myFish);
// expected output [ 'angel', 'clown', 'drum', 'guitar', 'mandarin', 'sturgeon' ]
console.log(removed);
// expected output []
// assert
console.assert(myFish.length === 6, 'myFish array length is incorrect');
console.assert(myFish[0] === 'angel', 'element at index 0 is incorrect');
console.assert(myFish[1] === 'clown', 'element at index 1 is incorrect');
console.assert(myFish[2] === 'drum', 'element not inserted correctly at index 2');
console.assert(myFish[3] === 'guitar', 'element not inserted correctly at index 3');
console.assert(myFish[4] === 'mandarin', 'element at index 4 is incorrect');
console.assert(myFish[5] === 'sturgeon', 'element at index 5 is incorrect');
console.assert(Array.isArray(removed), 'removed is not an array');
console.assert(removed.length === 0, 'removed is not empty');

// another case V
myFish = [ 'angel', 'clown', 'mandarin', 'sturgeon' ];
removed = myFish.splice(-2, 1);
// remove 1 element from index -2
console.log(myFish);
// expected output ['angel', 'clown', 'sturgeon']
console.log(removed);
// expected output ['mandarin']
// assert
console.assert(myFish.length === 3, 'myFish array length is incorrect');
console.assert(myFish[0] === 'angel', 'element at index 0 is incorrect');
console.assert(myFish[1] === 'clown', 'element at index 1 is incorrect');
console.assert(myFish[2] === 'sturgeon', 'element at index 2 is incorrect');
console.assert(Array.isArray(removed), 'removed is not an array');
console.assert(removed.length === 1, 'removed is not empty');
console.assert(removed[0] === 'mandarin', 'removed element is not mandarin');

//another case V
myFish = [ 'angel', 'clown', 'trumpet', 'sturgeon' ];
removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');
// remove 2 elements and insert 3
console.log(myFish);
// expected output ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
console.log(removed);
// expected output ['angel', 'clown']
// assert
console.assert(myFish.length = 5, 'myFish array length is incorrect');
console.assert(myFish[0] === 'parrot', 'element at index 0 is incorrect');
console.assert(myFish[1] === 'anemone', 'element at index 1 is incorrect');
console.assert(myFish[2] === 'blue', 'element at index 2 is incorrect');
console.assert(myFish[3] === 'trumpet', 'element at index 3 is incorrect');
console.assert(myFish[4] === 'sturgeon', 'element at index 4 is incorrect');
console.assert(Array.isArray(removed), 'removed is not an array');
console.assert(removed.length === 2, 'removed length is incorrect');
console.assert(removed[0] === 'angel', 'element at index 0 is not \'angel\'');
console.assert(removed[1] === 'clown', 'element at index 1 is not \'clown\'');


/* total expected output: 

[ 'Jan', 'Feb', 'March', 'April', 'May', 'June' ]
[]
[ 'Jan', 'Feb', 'March', 'April', 'May' ]
[ 'June' ]
[ 'angel', 'clown', 'drum', 'guitar', 'mandarin', 'sturgeon' ]
[]
[ 'angel', 'clown', 'sturgeon' ]
[ 'mandarin' ]
[ 'parrot', 'anemone', 'blue', 'trumpet', 'sturgeon' ]
[ 'angel', 'clown' ]

*/