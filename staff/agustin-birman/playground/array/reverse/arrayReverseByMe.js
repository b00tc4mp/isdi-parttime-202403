// debugger

function reverse (array) {
    var j = 0;
    var i = array.length - 1;
    var reverseArray = []
    
    for( i ; i >= 0; i--, j++)
       
        reverseArray[j] = array[i]
        
        return reverseArray
}

var array1 = [1,2,3,4,5,6,7,8,9];
reverse( array1)