delete Array.prototype.reverse;
Array.prototype.reverse = function reverse(array) {
  var result = [];
  for (var i = this.length - 1; i >= 0; i--) {
    result[result.length] = this[i];
  }
  return result;
};

var chars = ["a", "b", "c", "d", "e"];
var reversed = reverse(chars);
console.log(reversed);

const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

items.reverse();
console.log(items); // [3, 2, 1]

// funtion without prototype
var chars = ["a", "b", "c", "d", "e"];

function reverse(array) {
  var result = [];
  for (var i = array.length - 1; i >= 0; i--) {
    result[result.length] = array[i];
  }
  return result;
}

var chars = ["a", "b", "c", "d", "e"];
var reversed = reverse(chars);
console.log(reversed);

var reversed = chars.reverse(chars);

console.log(reversed);
