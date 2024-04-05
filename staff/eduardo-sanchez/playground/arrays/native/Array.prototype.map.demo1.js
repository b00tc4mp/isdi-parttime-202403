// CASE nums by 2

var nums = [1, 4, 9, 16]

var numsBy2 = nums.map(function (num) { return num * 2 })

console.log(nums)
// Array [1, 4, 9, 16]
console.log(numsBy2)
// Array [2, 8, 18, 32]


// CASE names to uppercase

var names = ['JaCk', 'pETer', 'jOHNnY']

var normalizedNames = names.map(function (name) { return name.toUpperCase() })

console.log(names)
// ['JaCk', 'pETer', 'jOHNnY']
console.log(normalizedNames)
// ['JACK', 'PETER', 'JOHNNY']