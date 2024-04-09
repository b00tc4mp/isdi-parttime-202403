console.info('CASE nums by 2')

var nums = [1, 4, 9, 16]

var numsBy2 = nums.map( function (num) { return num * 2})

console.debug(nums)
//[1, 4, 9, 16]

console.debug(numsBy2)
//[2, 8, 18, 32]

console.info('CASE names to uppercase')

var names = ['JacK', 'PetTeR', 'aNdrEW' ]

var normalizedName = names.map( function (name) { return name.toUpperCase() })

console.debug(names)

console.debug(normalizedName)
//['JACK', 'PETER', 'ANDREW']


console.info('CASE map elements and other arguments into objects')

var colors = ['red', 'green', 'blue', 'yellow']

var data = colors.map(function ( color, index, colors ) {
    var o = { color: color, index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)

/*
CASE nums by 2
[ 1, 4, 9, 16 ]
[ 2, 8, 18, 32 ]
CASE names to uppercase
[ 'JacK', 'PetTeR', 'aNdrEW' ]
[ 'JACK', 'PETTER', 'ANDREW' ]
CASE map elements and other arguments into objects
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