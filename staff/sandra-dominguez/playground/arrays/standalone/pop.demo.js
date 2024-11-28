//CASO mostrar el ultimo elemento y el resultado de como quedaria

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

function pop() {
  if(plants.length > 0) {
    var removePlant = plants.pop()
    console.log(removePlant)
  }
}

console.assert(plants.length === 5, 'lenght is 5')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')
console.assert(plants[4] === 'tomato', 'value at 4 is tomato')

var remove = pop(plants)
console.debug(remove)
console.debug(plants)

console.assert(plants.length === 4, 'lenght is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')



//CASO extraer ultima planta

function pop(array) {
  var remove = array[array.length - 1]
  array.length--

  return remove
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale']

console.assert(plants.length === 4, 'lenght is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')

var remove = pop(plants)
console.debug(remove)
console.debug(plants)

console.assert(plants.length === 3, 'lenght is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')