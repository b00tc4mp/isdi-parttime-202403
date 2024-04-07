var months = ['Jan', 'March', 'April', 'June'];
Array.prototype.splice = splice
function splice(index, nºToDelete, item){
    tempArray = []
    for (var i = this.length; i>=0; i--){
        if(i >= index + nºToDelete){
        tempArray[tempArray.length] = this[i-1]
        }
        if(i === index){
            tempArray[tempArray.length] = item
        }if (i< index){
            tempArray[tempArray.length] = this[i]
        }   
    }
    arrayTemp2 = []
    for(var j = tempArray.length; j > 0; j--){
        arrayTemp2[arrayTemp2.length] = tempArray[j-1]
    }
    this = arrayTemp2;
    return this
}

console.info("CASE add 1 element in a index, don't delete items")
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
/* 
splice(months,4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"] 
*/