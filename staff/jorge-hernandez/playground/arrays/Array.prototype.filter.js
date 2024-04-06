delete Array.prototype.filter;
Array.prototype.filter = function filter(callback) {
  var result = [];
  for (var i = 0; i < this.length; i++) {
    var element = this[i];
    if (callback(element)) {
      result[result.length] = element;
    }
  }
  return result;
};

var numbers = [12, 5, 8, 130, 44];
function isBigEnough(value) {
  return value >= 10;
}

var filtered = numbers.filter(isBigEnough);
// filtered is [12, 130, 44]
console.debug(filtered);

function filter(array, callback) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    if (callback(element)) {
      result[result.length] = element;
    }
  }
  return result;
}
var names = ["Alice", "Bob", "Eve", "Cecil"];
var filtered = filter(names, function (element) {
  return element.length > 3;
});
console.log(filtered);
// console.assert(filtered[0] === 12);
// console.assert(filtered[1] === 130);
// console.assert(filtered[2] === 44);
// console.debug(filtered);

var char = ["a", "b", "c", "d"];
var charA = char.filter(function (element) {
  return element === "a";
});

console.log(charA);
