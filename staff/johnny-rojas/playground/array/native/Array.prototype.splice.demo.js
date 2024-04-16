//------------------------------------------------------------------

console.info("CASE insert Feb in array months");

var months = ["Jan", "March", "April", "June"];

var removed = splice(months, 1, 0, "Feb");
// Inserts at index 1
console.log(removed);
// []
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 0, "removed is a empty");

console.log(months);
// Expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']
console.assert(months.length === 5, "length is 5");
console.assert(months[0] === "Jan", "months 0 is Jan");
console.assert(months[1] === "Feb", "months 1 is Feb");
console.assert(months[2] === "March", "months 2 is March");
console.assert(months[3] === "April", "months 3 is April");
console.assert(months[4] === "June", "months 4 is June");

//------------------------------------------------------------------

console.info("CASE replace one months by another");

var months = ["Jan", "Feb", "March", "April", "June"];

var removed = splice(months, 4, 1, "May");
// Replaces 1 element at index 4
console.assert(months);
console.debug(removed);
// output:['June']
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 1, "removed length is a 1");
console.assert(removed[0] === "June", "removed element is June");

console.debug(months);
// output: Array ['Jan', 'Feb', 'March', 'April', 'May']
console.assert(months.length === 5, "length is 5");
console.assert(months[0] === "Jan", "months 0 is Jan");
console.assert(months[1] === "Feb", "months 1 is Feb");
console.assert(months[2] === "March", "months 2 is March");
console.assert(months[3] === "April", "months 3 is April");
console.assert(months[4] === "May", "months 4 is May");

//------------------------------------------------------------------

console.info("CASE add drum fish at fishes");

var fishes = ["angel", "clown", "mandarin", "sturgeon"];

var removed = splice(fishes, 2, 0, "drum");
console.debug(removed);
//output: removed []
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 0, "removed is a empty");

console.debug(fishes);
//output: ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']
console.assert(fishes.length === 5, "length is 5");
console.assert(fishes[0] === "angel", "fish 0 is angel");
console.assert(fishes[1] === "clown", "fish 1 is clown");
console.assert(fishes[2] === "drum", "fish 2 is drum");
console.assert(fishes[3] === "mandarin", "fish 3 is mandarin");
console.assert(fishes[4] === "sturgeon", "fish 4 is sturgeon");

//------------------------------------------------------------------

console.info("CASE insert drum and guitar at fishes");

var fishes = ["angel", "clown", "mandarin", "sturgeon"];

var removed = splice(fishes, 2, 0, "drum", "guitar");
console.debug(removed);
//output: removed []
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 0, "removed is a empty");

console.debug(fishes);
//output: ['angel', 'clown', 'drum', 'mandarin', 'sturgeon']
console.assert(fishes.length === 6, "length is 6");
console.assert(fishes[0] === "angel", "fish 0 is angel");
console.assert(fishes[1] === "clown", "fish 1 is clown");
console.assert(fishes[2] === "drum", "fish 2 is drum");
console.assert(fishes[3] === "guitar", "fish 3 is guitar");
console.assert(fishes[4] === "mandarin", "fish 4 is mandarin");
console.assert(fishes[5] === "sturgeon", "fish 5 is sturgeon");

//------------------------------------------------------------------

console.info("CASE inserts drum, guitar and shark before clown");

var fishes = ["angel", "clown", "mandarin", "sturgeon"];

var removed = splice(fishes, 1, 0, "drum", "guitar", "flute", "microphone");
console.debug(removed);
//output: removed []
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 0, "removed is a empty");

console.debug(fishes);
//output: ['angel', 'drum', 'guitar, 'flute', 'microphone', 'clown', 'mandarin', 'sturgeon']
console.assert(fishes.length === 8, "length is 8");
console.assert(fishes[0] === "angel", "fish 0 is angel");
console.assert(fishes[1] === "drum", "fish 1 is drum");
console.assert(fishes[2] === "guitar", "fish 2 is guitar");
console.assert(fishes[3] === "flute", "fish 3 is flute");
console.assert(fishes[4] === "microphone", "fish 4 is microphone");
console.assert(fishes[5] === "clown", "fish 5 is clown");
console.assert(fishes[6] === "mandarin", "fish 6 is mandarin");
console.assert(fishes[7] === "sturgeon", "fish 7 is sturgeon");

//------------------------------------------------------------------

console.info("CASE inserts angel before clown");

var fishes = ["clown", "mandarin", "sturgeon"];
var removed = splice(fishes, 0, 0, "angel");

console.debug(removed);
// removed is [], no elements removed
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 0, "removed is empty");

console.debug(fishes);
// fishes is ['angel', 'clown', 'mandarin', 'sturgeon']
console.assert(fishes.length === 4, "length is 4");
console.assert(fishes[0] === "angel", "fish at 0 is angel");
console.assert(fishes[1] === "clown", "fish at 1 is clown");
console.assert(fishes[2] === "mandarin", "fish at 2 is mandarin");
console.assert(fishes[3] === "sturgeon", "fish at 3 is sturgeon");

//------------------------------------------------------------------

console.info("DEMO replace angel and clown with parrot, anemone, and blue");

var fishes = ["angel", "clown", "trumpet", "sturgeon"];
var removed = splice(fishes, 0, 2, "parrot", "anemone", "blue");

console.debug(removed);
// removed is ['angel', 'clown']
console.assert(removed instanceof Array, "removed is an array");
console.assert(removed.length === 2, "removed length is 2");
console.assert(removed[0] === "angel", "removed at 0 is angel");
console.assert(removed[1] === "clown", "removed at 1 is clown");

console.debug(fishes);
// fishes is ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
console.assert(fishes.length === 5, "length is 5");
console.assert(fishes[0] === "parrot", "fish at 0 is parrot");
console.assert(fishes[1] === "anemone", "fish at 1 is anemone");
console.assert(fishes[2] === "blue", "fish at 2 is blue");
console.assert(fishes[3] === "trumpet", "fish at 3 is trumpet");
console.assert(fishes[4] === "sturgeon", "fish at 4 is sturgeon");

//------------------------------------------------------------------
