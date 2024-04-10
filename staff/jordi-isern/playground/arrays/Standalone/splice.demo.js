var months = ['Jan', 'March', 'April', 'June'];
function splice(array,index, nºToDelete, item){
    tempArray = []
    for (var i = array.length; i>=0; i--){
    if(i >= index + nºToDelete){
        tempArray[tempArray.length] = array[i-1]
        }
        if(i === index){
            tempArray[tempArray.length] = item
        }if (i< index){
            tempArray[tempArray.length] = array[i]
        }   
    }
    arrayTemp2 = []
    for(var j = tempArray.length; j > 0; j--){
        arrayTemp2[arrayTemp2.length] = tempArray[j-1]
    }
    return arrayTemp2
}

console.info("CASE add 1 element in a index, don't delete items")
months = splice(months,1, 0, 'Feb')
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
/* 
splice(months,4, 1, 'May');
// Replaces 1 element at index 4
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"] 
*/