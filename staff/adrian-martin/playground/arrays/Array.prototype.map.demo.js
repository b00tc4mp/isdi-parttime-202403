//CASE nums by 2

var nums = [1, 4, 9, 16];

const numsBy2 = nums.map(function (num) { return num * 2} );

console.log(nums)   //Array [1, 4, 9, 16]

console.log(numsBy2);   //Array [2, 8, 18, 32]

//CASE names yo uppercase

var names = ['ADRiAn', 'IÑaKI', 'jESUs','ISMael']

var normalnames = names.map( function (nombre) { console.log(nombre.toUpperCase())})