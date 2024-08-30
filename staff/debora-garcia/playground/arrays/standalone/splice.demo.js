function splice(array,start,deleteCount,item1){
    array[start]=0
}

var months = ['Jan', 'March', 'April', 'June'];
var removed=months(months,1, 0, 'Feb');
// Inserts at index 1
console.log(removed)
//[]

console.assert(removed instanceof Array,"removed is an array")
console.assert(removed.length===0,"removed is empty")




console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]