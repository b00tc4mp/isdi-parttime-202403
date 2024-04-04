delete Array.prototype.concat;
delete Array.prototype.slice;
//delete Array.prototype.pop;
//delete Array.prototype.push;
// * node breaks if it doesnt have pop
// * node breaks if it doesnt have push


//call pop as a function VVV
var pop = function(arr) {
    var newArray = []; 
    
    for(var i = 0; i < arr.length -1; i++){
        newArray[i] = arr[i];
    }

    return newArray;
}


// case V
var arr = [ 0, 1, 2, 3, 4 ];
console.log(pop(arr));
// expected output [ 0, 1, 2, 3 ]