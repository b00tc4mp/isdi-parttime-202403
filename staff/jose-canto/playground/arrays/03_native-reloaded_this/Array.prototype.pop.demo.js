//delete Array.prototype.pop // Elminamos el metodo pop para evitar usar el metodo.

console.info(" --- CASE delete last element ---");

Array.prototype.pop = function () {

  var lastIndex = this.length - 1;

  var lastElement = this[lastIndex]

  this.length = this.length - 1

  return lastElement
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(plants)

var elementDeleted = plants.pop();
console.debug(`Element deleted: ${elementDeleted}`);
//* Expected output: "tomato"

console.log(plants);
//* Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

//! TEST ASSERT
console.assert(elementDeleted === "tomato", "element deleted is tomato")
console.assert(plants.length === 4, "length of plants is 4")
console.assert(plants[0] === "broccoli", "first element is broccoli")
console.assert(plants[1] === "cauliflower", "second element is not broccoli");
console.assert(plants[2] === "cabbage", "third element is cabbage")
console.assert(plants[3] === "kale", "four element is kale")

//? ----------------------------------------------------------------

console.info(" --- CASE delete last element ---");

var elementDeleted = plants.pop();
console.debug(`Element deleted: ${elementDeleted}`)

console.log(plants);
//* Expected output: Array ["broccoli", "cauliflower", "cabbage"]

//! TEST ASSERTs
console.assert(elementDeleted === "kale", " element deleted is kale")
console.assert(plants.length === 3, "length of plants is 3")
console.assert(plants[0] === "broccoli", "first element is broccoli")
console.assert(plants[1] === "cauliflower", "second element is not broccoli");
console.assert(plants[2] === "cabbage", "third element is cabbage")


