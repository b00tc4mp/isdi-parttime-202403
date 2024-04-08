//delete Array.prototype.push

function push(array) {
  for (var i = 1; i < arguments.length; i++) {
    var argument = arguments[i];
    array[array.length] = argument;
  }
  return array.length;
}

console.info("CASE add animal to array");

var element = ["pigs", "goats", "sheep"];
var count = push(element, "cows");

console.debug(count);
console.debug(element);

console.info("Case add various element to array");

var count = push(element, "dogs", "cats", "mouses");

console.debug(count);
console.debug(element);

console.assert(element.length === 7, "element lenght is 7");
console.assert(element[0] === "pigs", "element 0 is pigs");
console.assert(element[1] === "goats", "element 1 is goats");
console.assert(element[2] === "sheep", "element 2 is sheep");
console.assert(element[3] === "cows", "element 3 is cows");
