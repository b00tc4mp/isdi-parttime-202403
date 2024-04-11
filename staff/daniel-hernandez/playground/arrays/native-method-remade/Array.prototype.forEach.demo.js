delete Array.prototype.forEach;

Array.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}


//print chars to uppercase in console
var chars = [ 'a', 'b', 'c' ];
var expectedOutput = ['A', 'B', 'C'];
chars.forEach(function (element, index) { 
    //console.log(element.toUpperCase());

    console.assert(element.toUpperCase() === expectedOutput[index], "char should be uppercase");
})
// A
// B
// C

//create a object for each index
var cars = [ 'lambo', 'bugatti', 'ferrari' ];
var data = [];
cars.forEach(function (car, index, cars) {
    var o = { car: car, index: index, cars: cars };

    data[data.length] = o;
})

console.assert(data.length === 3, "data length should be 3");
console.assert(data[0].car === 'lambo', "first car should be 'lambo'");
console.assert(data[1].index === 1, "second index should be 1");

//console.debug(data);
//console.table(data);

/* total output
A
B
C
[
  { car: 'lambo', index: 0, cars: [ 'lambo', 'bugatti', 'ferrari' ] },
  { car: 'bugatti', index: 1, cars: [ 'lambo', 'bugatti', 'ferrari' ] },
  { car: 'ferrari', index: 2, cars: [ 'lambo', 'bugatti', 'ferrari' ] }
]
┌─────────┬───────────┬───────┬───────────────────────────────────┐
│ (index) │ car       │ index │ cars                              │
├─────────┼───────────┼───────┼───────────────────────────────────┤
│ 0       │ 'lambo'   │ 0     │ [ 'lambo', 'bugatti', 'ferrari' ] │
│ 1       │ 'bugatti' │ 1     │ [ 'lambo', 'bugatti', 'ferrari' ] │
│ 2       │ 'ferrari' │ 2     │ [ 'lambo', 'bugatti', 'ferrari' ] │
└─────────┴───────────┴───────┴───────────────────────────────────┘
*/