function Irriy() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        this.length = arguments[0];
    } else {
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }

        this.length = arguments.length;
    }
}

Irriy.prototype.push = function () {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
        args[args.length] = arguments[i];
    }

    for (var k = 0; k < args.length; k++) {
        this[this.length] = args[k];
        this.length++;
    }

    return this.length
}

Irriy.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

Irriy.prototype.reverse = function () {
    var start = 0, end = this.length - 1, starty;

    while(start < end) {
        starty = this[start];
        this[start] = this[end];
        this[end] = starty;

        start++, end--;
    }

    return this;
}

// tests
var fruits = new Irriy('Apple', 'Banana');
// console.log(fruits);
// Irriy { '0': 'Apple', '1': 'Banana', length: 2 }
// assert fruits
console.assert(fruits instanceof Irriy, 'fruits should be an instance of Irriy');
console.assert(!(fruits instanceof Array), 'fruits shouldn\'t be an instance of Array');
console.assert(fruits.length === 2, 'fruits length is incorrect');
console.assert(fruits[0] === 'Apple', 'element at index 0 should be Apple');
console.assert(fruits[1] === 'Banana', 'element at index 1 should be Banana');


// another case V
var fruits = new Irriy(3);
// console.log(fruits);
// Irriy { length: 3 }
// assert fruits
console.assert(fruits instanceof Irriy, 'fruits should be an instance of Irriy');
console.assert(!(fruits instanceof Array), 'fruits shouldn\'t be an instance of Array');
console.assert(fruits.length === 3, 'fruits length is incorrect');
console.assert(fruits[0] === undefined, 'element at index 0 should be undefined');
console.assert(fruits[1] === undefined, 'element at index 1 should be undefined');
console.assert(fruits[2] === undefined, 'element at index 2 should be undefined');


// another case V
var fruits = new Irriy('3');
// console.log(fruits);
// Irriy { '0': '3', length: 1 }
// assert fruits
console.assert(fruits instanceof Irriy, 'fruits should be an instance of Irriy');
console.assert(!(fruits instanceof Array), 'fruits shouldn\'t be an instance of Array');
console.assert(fruits.length === 1, 'fruits length is incorrect');
console.assert(fruits[0] === '3', 'element at index 0 should be "3"');

// forEach cases
var chars = new Irriy('a', 'b', 'c');
var result = new Irriy();
chars.forEach(function (element) {
    //console.log(element.toUpperCase()) 
    //A
    //B
    //C
    result[result.length] = element.toUpperCase();
    result.length++;
})
console.assert(chars instanceof Irriy, 'chars should be an instance of Irriy');
console.assert(!(chars instanceof Array), 'chars shouldn\'t be an instance of Array');
console.assert(result instanceof Irriy, 'result should be an instance of Irriy');
console.assert(!(result instanceof Array), 'result shouldn\'t be an instance of Array');
console.assert(result.length === 3, 'Result length should be 3');
console.assert(result[0] === 'A', 'result element at index 0 should be "A"');
console.assert(result[1] === 'B', 'result element at index 1 should be "B"');
console.assert(result[2] === 'C', 'result element at index 2 should be "C"');

// another case
var cars = new Irriy('lambo', 'bugatti', 'ferrari');
var data = new Irriy();
cars.forEach(function (car, index, cars) {
    var o = { car: car, index: index, cars: cars };

    data[data.length] = o;
    data.length++;
})

console.assert(cars instanceof Irriy, 'cars should be an instance of Irriy');
console.assert(!(cars instanceof Array), 'cars shouldn\'t be an instance of Array');
console.assert(data instanceof Irriy, 'data should be an instance of Irriy');
console.assert(!(data instanceof Array), 'data shouldn\'t be an instance of Array');
console.assert(data.length === 3, 'data length should be 3');
console.assert(data[0].car === 'lambo', 'car at index 0 should be "lambo"');
console.assert(data[1].car === 'bugatti', 'car at index 1 should be "bugatti"');
console.assert(data[2].car === 'ferrari', 'car at index 2 should be "ferrari"');

//console.debug(data);
//console.table(data);

/*
Irriy {
  '0': {
    car: 'lambo',
    index: 0,
    cars: Irriy { '0': 'lambo', '1': 'bugatti', '2': 'ferrari', length: 3 }
  },
  '1': {
    car: 'bugatti',
    index: 1,
    cars: Irriy { '0': 'lambo', '1': 'bugatti', '2': 'ferrari', length: 3 }
  },
  '2': {
    car: 'ferrari',
    index: 2,
    cars: Irriy { '0': 'lambo', '1': 'bugatti', '2': 'ferrari', length: 3 }
  },
  length: 3
}
┌─────────┬───────────┬───────┬─────────┬────────┐
│ (index) │ car       │ index │ cars    │ Values │
├─────────┼───────────┼───────┼─────────┼────────┤
│ 0       │ 'lambo'   │ 0     │ [Irriy] │        │
│ 1       │ 'bugatti' │ 1     │ [Irriy] │        │
│ 2       │ 'ferrari' │ 2     │ [Irriy] │        │
│ length  │           │       │         │ 3      │
└─────────┴───────────┴───────┴─────────┴────────┘
*/

// push cases
var animals = new Irriy( 'pigs', 'goats', 'sheep' );
var count = animals.push('cows');
// console.log(count);
//Expected output: 4
// console.log(animals);
//Irriy { '0': 'pigs', '1': 'goats', '2': 'sheep', '3': 'cows', length: 4 }
// assert
console.assert(animals instanceof Irriy, 'animals should be an instance of Irriy');
console.assert(!(animals instanceof Array), 'animals shouldn\'t be an instance of Array');
console.assert(count === 4, 'count is incorrect');
console.assert(animals.length === 4, 'animals length is incorrect');
console.assert(animals[0] === 'pigs', 'element at index 0 is incorrect');
console.assert(animals[1] === 'goats', 'element at index 1 is incorrect');
console.assert(animals[2] === 'sheep', 'element at index 2 is incorrect');
console.assert(animals[3] === 'cows', 'element at index 3 is incorrect');

var countAgain = animals.push('chickens', 'cats', 'dogs');
//expected output 7
// console.log(animals);
//Irriy { '0': 'pigs', '1': 'goats', '2': 'sheep', '3': 'cows', '4': 'chickens', '5': 'cats', '6': 'dogs', length: 7 }
// assert
console.assert(countAgain === 7, 'countAgain is incorrect');
console.assert(animals.length === 7, 'animals2 length is incorrect');
console.assert(animals[0] === 'pigs', 'element at index 0 is incorrect');
console.assert(animals[1] === 'goats', 'element at index 1 is incorrect');
console.assert(animals[2] === 'sheep', 'element at index 2 is incorrect');
console.assert(animals[3] === 'cows', 'element at index 3 is incorrect');
console.assert(animals[4] === 'chickens', 'element at index 4 is incorrect');
console.assert(animals[5] === 'cats', 'element at index 5 is incorrect');
console.assert(animals[6] === 'dogs', 'element at index 6 is incorrect');


//case V
var arr = new Irriy( 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 );
var count2 = arr.push(11, 12, [13, 14]);
// console.log(arr.push(11, 12, [13, 14]));
//expected output 13
// console.log(arr)
//Irriy { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5,'5': [ 6 ], '6': 7, '7': 8, '8': 9, '9': 10, '10': 11, '11': 12, '12': [ 13, 14 ], length: 13 }
// assert
console.assert(arr instanceof Irriy, 'arr should be an instance of Irriy');
console.assert(!(arr instanceof Array), 'arr shouldn\'t be an instance of Array');
console.assert(count2 === 13, 'count2 is incorrect');
console.assert(arr.length === 13, 'arr length is incorrect');
console.assert(arr[0] === 1, 'element at index 0 is incorrect');
console.assert(arr[1] === 2, 'element at index 1 is incorrect');
console.assert(arr[2] === 3, 'element at index 2 is incorrect');
console.assert(arr[3] === 4, 'element at index 3 is incorrect');
console.assert(arr[4] === 5, 'element at index 4 is incorrect');
console.assert(Array.isArray(arr[5]), 'element at index 5 is not an array');
console.assert(arr[5][0] === 6, 'element at index 5, 0 is incorrect');
console.assert(arr[6] === 7, 'element at index 6 is incorrect');
console.assert(arr[7] === 8, 'element at index 7 is incorrect');
console.assert(arr[8] === 9, 'element at index 8 is incorrect');
console.assert(arr[9] === 10, 'element at index 9 is incorrect');
console.assert(arr[10] === 11, 'element at index 10 is incorrect');
console.assert(arr[11] === 12, 'element at index 11 is incorrect');
console.assert(Array.isArray(arr[12]), 'element at index 12 is is not an array');
console.assert(arr[12][0] === 13, 'element at index 12, 0 is incorrect');
console.assert(arr[12][1] === 14, 'element at index 12, 1 is incorrect');

// another case V
var arr1 = new Irriy( 'pigs', 'goats', 'sheep' );
var count3 = arr1.push('cows');
// console.log(arr1.push('cows'));
//expected output 4
// console.log(arr1);
//Irriy { '0': 'pigs', '1': 'goats', '2': 'sheep', '3': 'cows', length: 4 }
// assert
console.assert(arr1 instanceof Irriy, 'arr1 should be an instance of Irriy');
console.assert(!(arr1 instanceof Array), 'arr1 shouldn\'t be an instance of Array');
console.assert(count3 === 4, 'count3 is incorrect');
console.assert(arr1.length === 4, 'arr1 length is incorrect');
console.assert(arr1[0] === 'pigs', 'element at index 0 is incorrect');
console.assert(arr1[1] === 'goats', 'element at index 1 is incorrect');
console.assert(arr1[2] === 'sheep', 'element at index 2 is incorrect');
console.assert(arr1[3] === 'cows', 'element at index 3 is incorrect');


// another case V 
var arr2 = new Irriy( 1, 2, 3 );
var noPush = arr2.push();
// console.log(arr2.push()); //push nothing
//expected output 3
// console.log(arr2);
//Irriy { '0': 1, '1': 2, '2': 3, length: 3 }
// assert
console.assert(arr2 instanceof Irriy, 'arr2 should be an instance of Irriy');
console.assert(!(arr2 instanceof Array), 'arr2 shouldn\'t be an instance of Array');
console.assert(noPush === 3, 'noPush is incorrect');
console.assert(arr2.length === 3, 'arr2 length is incorrect');
console.assert(arr2[0] === 1, 'element at index 0 is incorrect');
console.assert(arr2[1] === 2, 'element at index 1 is incorrect');
console.assert(arr2[2] === 3, 'element at index 2 is incorrect');

//another case V
var arr3 = new Irriy( [ 1, 2, 3 ], [ 4 , 5, 6 ] );
var objPush = arr3.push({ 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )
// console.log(arr3.push({ 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )); //push a object
//expected output 3
// console.log(arr3);
//Irriy { '0': [ 1, 2, 3 ], '1': [ 4, 5, 6 ], '2': { '1': 2, '3': 4, '5': 6, a: [ 7, 8, 9 ] }, length: 3 }
// assert
console.assert(arr3 instanceof Irriy, 'arr3 should be an instance of Irriy');
console.assert(!(arr3 instanceof Array), 'arr3 shouldn\'t be an instance of Array');
console.assert(objPush === 3, 'objPush is incorrect');
console.assert(arr3.length === 3);
console.assert(Array.isArray(arr3[0]), 'element at index 0 is not an array');
console.assert(arr3[0][0] === 1, 'element at index 0, 0 is incorrect');
console.assert(arr3[0][1] === 2, 'element at index 0, 1 is incorrect');
console.assert(arr3[0][2] === 3, 'element at index 0, 2 is incorrect');
console.assert(Array.isArray(arr3[1]), 'element at index 1 is not an array');
console.assert(arr3[1][0] === 4, 'element at index 1, 0 is incorrect');
console.assert(arr3[1][1] === 5, 'element at index 1, 1 is incorrect');
console.assert(arr3[1][2] === 6, 'element at index 1, 2 is incorrect');
console.assert(typeof arr3[2] === 'object' && arr3[2] !== null && !Array.isArray(arr3[2]), 'element at index 2 is not an object');

// reverse cases
var array1 = new Irriy('one', 'two', 'three'); // [ 'one', 'two', 'three' ]
var reversed = array1.reverse(); // [ 'three', 'two', 'one' ]
// Careful: reverse is destructive -- it changes the original array.
//console.log('array1:', array1);
//console.log(reversed);
// Expected output: 'array1:' [ 'three', 'two', 'one' ]
// assert
console.assert(reversed instanceof Irriy, 'reversed should be an instance of Irriy');
console.assert(reversed.length === 3, 'reversed length is incorrect');
console.assert(reversed[0] === 'three', 'element at index 0 should be \'three\'');
console.assert(reversed[1] === 'two', 'element at index 1 should be \'two\'');
console.assert(reversed[2] === 'one', 'element at index 2 should be \'one\'');
console.assert(array1 instanceof Irriy, 'array1 should be an instance of Irriy');
console.assert(array1.length === 3, 'array1 length is incorrect');
console.assert(array1[0] === 'three', 'element at index 0 should be \'three\'');
console.assert(array1[1] === 'two', 'element at index 1 should be \'two\'');
console.assert(array1[2] === 'one', 'element at index 2 should be \'one\'');

// another case
var items = new Irriy(1, 2, 3);
items.reverse(); // [3, 2, 1]
console.assert(items instanceof Irriy, 'items should be an instance of Irriy');
console.assert(items.length === 3, 'items length is incorrect');
console.assert(items[0] === 3, 'element at index 0 should be 3');
console.assert(items[1] === 2, 'element at index 1 should be 2');
console.assert(items[2] === 1, 'element at index 2 should be 1');

// another case
const numbers = new Irriy(3, 2, 4, 1, 5);
const reversed1 = numbers.reverse();
// numbers and reversed are both in reversed order [5, 1, 4, 2, 3]
reversed1[0] = 5;
//console.log(numbers[0]); // 5
// assert
console.assert(numbers instanceof Irriy, 'numbers should be an instance of Irriy');
console.assert(numbers.length === 5, 'numbers length is incorrect');
console.assert(numbers[0] === 5, 'element at index 0 should be 5');
console.assert(numbers[1] === 1, 'element at index 1 should be 1');
console.assert(numbers[2] === 4, 'element at index 2 should be 4');
console.assert(numbers[3] === 2, 'element at index 3 should be 2');
console.assert(numbers[4] === 3, 'element at index 4 should be 3');
console.assert(reversed1 instanceof Irriy, 'reversed1 should be an instance of Irriy');
console.assert(reversed1.length === 5, 'reversed1 length is incorrect');
console.assert(reversed1[0] === 5, 'element at index 0 should be 5');
console.assert(reversed1[1] === 1, 'element at index 1 should be 1');
console.assert(reversed1[2] === 4, 'element at index 2 should be 4');
console.assert(reversed1[3] === 2, 'element at index 3 should be 2');
console.assert(reversed1[4] === 3, 'element at index 4 should be 3');

// another case
const numbers1 = new Irriy(3, 2, 4, 1, 5, 6);
const reversed2 = numbers1.reverse();
// numbers and reversed are both in reversed order [6, 5, 1, 4, 2, 3]
reversed2[0] = 6;
//console.log(numbers1[0]); // 6
// assert
console.assert(numbers1 instanceof Irriy, 'numbers1 should be an instance of Irriy');
console.assert(numbers1.length === 6, 'numbers1 length is incorrect');
console.assert(numbers1[0] === 6, 'element at index 0 should be 6');
console.assert(numbers1[1] === 5, 'element at index 1 should be 5');
console.assert(numbers1[2] === 1, 'element at index 2 should be 1');
console.assert(numbers1[3] === 4, 'element at index 3 should be 4');
console.assert(numbers1[4] === 2, 'element at index 4 should be 2');
console.assert(numbers1[5] === 3, 'element at index 5 should be 3');

console.assert(reversed2 instanceof Irriy, 'reversed2 should be an instance of Irriy');
console.assert(reversed2.length === 6, 'reversed2 length is incorrect');
console.assert(reversed2[0] === 6, 'element at index 0 should be 6');
console.assert(reversed2[1] === 5, 'element at index 1 should be 5');
console.assert(reversed2[2] === 1, 'element at index 2 should be 1');
console.assert(reversed2[3] === 4, 'element at index 3 should be 4');
console.assert(reversed2[4] === 2, 'element at index 4 should be 2');
console.assert(reversed2[5] === 3, 'element at index 5 should be 3');