var months = ['Jan', 'March', 'April', 'June'];
var removed=months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(removed)
//[]

console.assert(removed instanceof Array,"removed is an array")
console.assert(removed.length===0,"removed is empty")




console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]

