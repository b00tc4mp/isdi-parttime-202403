// delete Array.prototype.unshift

function unshift(array, element, element2) {
  for (var i = array.length; i >= 0; i--){
    array[i] = array[i - 1] 
  }
  array[0] = element

  return array.length
}

var namesList = ['Andrea', 'Valentina', 'Jesus']
var newName = unshift(namesList, 'Hector', 'Helena')

console.debug(namesList)
console.debug(namesList.length)

//No me imprime newName, pero si nameList de forma correcta 

//------------------------------

var numbers = [1, 2, 3]
var newNumbers = unshift(numbers, 4)


console.debug(numbers)
// Expected output: 5

console.log(newNumbers);
// Expected output: Array [4, 5, 1, 2, 3]