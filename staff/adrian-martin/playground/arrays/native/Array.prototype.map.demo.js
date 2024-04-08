console.info('CASE nums by 2')

var nums = [1, 4, 9, 16];

var numsBy2 = nums.map(function (num) { return num * 2} );

console.debug(nums) 

console.debug(numsBy2);
/*
[ 1, 4, 9, 16 ]
[ 2, 8, 18, 32 ]
*/  

console.info('CASE names yo uppercase')

var names = ['ADRiAn', 'IÑaKI', 'jESUs','ISMael']

//var normalnames = names.map( function (nombre) { console.log(nombre.toUpperCase())})

var normalnames = names.map( function (name) { return name.toUpperCase()})

console.debug(names)
console.debug(normalnames)
/*
[ 'ADRiAn', 'IÑaKI', 'jESUs', 'ISMael' ]
[ 'ADRIAN', 'IÑAKI', 'JESUS', 'ISMAEL' ]
*/

console.info('CASE map elements and other arguments into objects')

var colors = ['red', 'blue', 'black', 'green']

var data = colors.map(function(color, index, colors){
    var o = {color: color, index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)
/*
{
    color: 'red',
    index: 0,
    colors: [ 'red', 'blue', 'black', 'green' ]
  },
  {
    color: 'blue',
    index: 1,
    colors: [ 'red', 'blue', 'black', 'green' ]
  },
  {
    color: 'black',
    index: 2,
    colors: [ 'red', 'blue', 'black', 'green' ]
  },
  {
    color: 'green',
    index: 3,
    colors: [ 'red', 'blue', 'black', 'green' ]
  }
]
┌─────────┬─────────┬───────┬─────────────────────────────────────────────┐
│ (index) │ color   │ index │ colors                                      │
├─────────┼─────────┼───────┼─────────────────────────────────────────────┤
│ 0       │ 'red'   │ 0     │ [ 'red', 'blue', 'black', ... 1 more item ] │
│ 1       │ 'blue'  │ 1     │ [ 'red', 'blue', 'black', ... 1 more item ] │
│ 2       │ 'black' │ 2     │ [ 'red', 'blue', 'black', ... 1 more item ] │
│ 3       │ 'green' │ 3     │ [ 'red', 'blue', 'black', ... 1 more item ] │
└─────────┴─────────┴───────┴─────────────────────────────────────────────┘
*/