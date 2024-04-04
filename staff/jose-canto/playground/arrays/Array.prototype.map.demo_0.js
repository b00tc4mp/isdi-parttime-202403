//Ejemplo usando Metodo array Map 

console.info(" -- Case nums multiply * 2 -- ")

var nums = [2, 4, 6, 8, 10];

var numsBy2 = nums.map(function (num) { return num * 2 })

console.info(nums) // [ 2, 4, 6, 8, 10 ]
console.info(numsBy2) // [ 4, 8, 12, 16, 20 ]


console.info(" -- CASE names toUpperCase() --")

var names = ["JaCk", "peTeR", "johNnY", "luNa"]

var nameToUpperCase = names.map(function (name) { return name.toUpperCase() })

console.debug(names) // [ 'JaCk', 'peTeR', 'johNnY', 'luNa' ]
console.debug(nameToUpperCase) // [ 'JACK', 'PETER', 'JOHNNY', 'LUNA' ]