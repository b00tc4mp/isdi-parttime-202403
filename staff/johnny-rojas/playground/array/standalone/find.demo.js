//delete Array.prototype.find

//El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.

function find(array, callback) {
  var finded = undefined;
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      finded = array[i];
      break;
    }
  }
  return finded;
}

//-----------------------------------------------------
console.info('CASE find de number bigger than 10')

var nums = [5, 12, 8, 130, 44];

var found = find(nums, function (element) {
  return element > 10;
});

console.debug(found);
//output:12
console.assert(nums[0] < 10, '5 is smaller than 10')
console.assert(nums[1] > 10, '12 is bigger than 10')
console.assert(nums[2] < 10, '8 is smaller than 10')


//-----------------------------------------------------

var fruits = ['Apple', 'Pinneapple', 'Pear']

var fruitsFound = find(fruits, function (element) {
  return element.length > 9
})

console.debug(fruitsFound) 
//watermelon 
console.assert(fruits.length < 9, 'the length for Apple is smaller than 9')
console.assert(fruits.length >= 9, 'the length for Pinneaple is bigger than 9') //No funciona 


