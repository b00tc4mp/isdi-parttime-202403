//delete Array.prototype.find

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

var nums = [5, 12, 8, 130, 44];

var found = find(nums, function (element) {
  return element > 10;
});

console.debug(found);
//output:12

/* var fruits = ['Watermelon', 'Apple', 'Pinneapple', 'Pear']

var fruitsFound = find(fruits, function (element) {
  return element.length > 9
})

console.debug(fruitsFound) */
//NO FUNCIONA 


/* El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
arr.find(callback(element[, index[, array]])[, thisArg]) */