delete Array.prototype.map

function map(array, callback) {
    var mapped = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        var mappedElement = callback(element, i, array)

        mapped[i] = mappedElement
    }

    return mapped
}

console.info('CASE nums by 2')

var nums = [1, 4, 9, 16]

var numsBy2 = map(nums, function (num) { return num * 2 })

console.debug(nums)
// Array [1, 4, 9, 16]
console.debug(numsBy2)
// Array [2, 8, 18, 32]


console.info('CASE names to uppercase')

var names = ['JaCk', 'pETer', 'jOHNnY']

var normalizedNames = map(names, function (name) { return name.toUpperCase() })

console.debug(names)
// ['JaCk', 'pETer', 'jOHNnY']
console.debug(normalizedNames)
// ['JACK', 'PETER', 'JOHNNY']

console.info('CASE map elements and other arguments into objects')

var colors = ['red', 'green', 'blue', 'yellow']

var data = map(colors, function (color, index, colors) {
    var o = { color: color, index: index, colors: colors }

    return o
})

console.debug(data)
console.table(data)
/*
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