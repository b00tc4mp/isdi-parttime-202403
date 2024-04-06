var animals = ["pig", "cow", "bird"];

function push(array) {
  for (i = 1; i < arguments.length; i++) {
    var argument = arguments[i];
    array[array.length] = argument;
  }
  return array.length;
}
console.info("CASE add a animal to array");

var count = push(animals, "horse");

console.debug(count);
console.assert(count === 4, "count is 4");
console.debug(animals);
console.assert(animals[0] === "pig", "first element is 'pig'");
console.assert(animals[1] === "cow", "second element is 'cow'");
console.assert(animals[2] === "bird", "third element is 'bird'");
console.assert(animals[3] === "horse", "last element is 'horse'");

console.info("CASE add various animals to array");
var animals = ["pig", "cow", "bird"];
var count = push(animals, "fly", "dog", "cat");

console.debug(count);
console.assert(count === 6, "count is 6");
console.debug(animals);
console.assert(animals[0] === "pig", "first element is 'pig'");
console.assert(animals[1] === "cow", "second element is 'cow'");
console.assert(animals[2] === "bird", "third element is 'bird'");
console.assert(animals[3] === "fly", "fourth element is 'fly'");
console.assert(animals[4] === "dog", "fifth element is 'dog'");
console.assert(animals[5] === "cat", "sixth element is 'cat'");
