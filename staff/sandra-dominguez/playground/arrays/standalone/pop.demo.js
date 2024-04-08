//CASO mostrar el ultimo elemento y el resultado de como quedaria

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

function pop() {
  if(plants.length > 0) {
    var removePlant = plants.pop()
    console.log(removePlant)
  }
}

pop(plants)
console.debug(plants)

//CASO funcion con callback

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

function pop(array, callback) {
  if(array.length > 0) {
    var removePlant = array.pop()

    if (callback) {
      callback(removePlant)
    }
  }
}

pop(plants, function(removed) {
  console.log(removed)
  console.log(plants)
})