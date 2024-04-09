console.info('CASE insert Feb in array months')

var months = ["Jan", "March", "April", "June"]

var removed = months.splice(1, 0, "Feb");
// Inserts at index 1
console.log(removed)
// []
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is a empty')

console.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'months 0 is Jan')
console.assert(months[1] === 'Feb', 'months 1 is Feb')
console.assert(months[2] === 'March', 'months 2 is March')
console.assert(months[3] === 'April', 'months 3 is April')
console.assert(months[4] === 'June', 'months 4 is June')


//---------------------------------------------

console.info("CASE replece one months by another");

var months = ["Jan", "Feb", "March", "April", "June"];

var removed = months.splice(4, 1, "May");
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