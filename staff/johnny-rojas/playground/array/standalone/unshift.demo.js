// delete Array.prototype.unshift

function unshift(array, element) {
  for (var i = array.length; i >= 0; i--){
    array[i] = array[i - 1] 
  }
  array[0] = element
}

var namesList = ['Andrea', 'Valentina', 'Jesus']
var newName = unshift(namesList, 'Hector')
console.debug(namesList)

//No me imprime newName, pero si nameList de forma correcta 
