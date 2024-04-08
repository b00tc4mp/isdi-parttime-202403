//delete Array.prototype.pop

function pop(array) {
  if (array.length === 0) {

    return undefined;
  } else {

    var lastElement = array[array.length - 1];

    array.length = array.length - 1;

    return lastElement;
  }
}

var array = [1, 2, 3, 4];
var lastElement = pop(array);

console.debug(array); 
// [1, 2, ,3]
console.debug("Element delete:", lastElement);
// 4

