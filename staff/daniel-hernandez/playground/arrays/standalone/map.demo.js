delete Array.prototype.map; 

function map(array, callback) {

    var mapped = []

    for (var i = 0; i < array.length; i++) {
      var element = array[i]

      var mappedElement = callback(element, i, array)

      mapped[i] = mappedElement
    }

    return mapped
}

// CASE nums by 2

var nums = [1, 4, 9, 16]

var numsBy2 = map(nums, function (num) { return num * 2 })

console.log(nums)
// Array [1, 4, 9, 16]
console.log(numsBy2)
// Array [2, 8, 18, 32]


// CASE names to uppercase

var names = ['JaCk', 'pETer', 'jOHNnY']

var normalizedNames = map(names, function (name) { return name.toUpperCase() })

console.log(names)
// ['JaCk', 'pETer', 'jOHNnY']
console.log(normalizedNames)
// ['JACK', 'PETER', 'JOHNNY']

// CASE map arguments into object
var colors = ['red', 'green', 'blue', 'yellow'];

var data = map(colors, function(color, index, colors) { 
    var object = { color: color, index: index, colors: colors }

    return object
 });

 console.log(data);
 console.table(data);

 /* total expected output
[ 1, 4, 9, 16 ]
[ 2, 8, 18, 32 ]
[ 'JaCk', 'pETer', 'jOHNnY' ]
[ 'JACK', 'PETER', 'JOHNNY' ]
[
  {
    color: 'red',
    index: 0,
    colors: [ 'red', 'green', 'blue', 'yellow' ]
  },
  {
    color: 'green',
    index: 1,
    colors: [ 'red', 'green', 'blue', 'yellow' ]
  },
  {
    color: 'blue',
    index: 2,
    colors: [ 'red', 'green', 'blue', 'yellow' ]
  },
  {
    color: 'yellow',
    index: 3,
    colors: [ 'red', 'green', 'blue', 'yellow' ]
  }
]
┌─────────┬──────────┬───────┬─────────────────────────────────────────────┐
│ (index) │ color    │ index │ colors                                      │
├─────────┼──────────┼───────┼─────────────────────────────────────────────┤
│ 0       │ 'red'    │ 0     │ [ 'red', 'green', 'blue', ... 1 more item ] │
│ 1       │ 'green'  │ 1     │ [ 'red', 'green', 'blue', ... 1 more item ] │
│ 2       │ 'blue'   │ 2     │ [ 'red', 'green', 'blue', ... 1 more item ] │
│ 3       │ 'yellow' │ 3     │ [ 'red', 'green', 'blue', ... 1 more item ] │
└─────────┴──────────┴───────┴─────────────────────────────────────────────┘ 
*/