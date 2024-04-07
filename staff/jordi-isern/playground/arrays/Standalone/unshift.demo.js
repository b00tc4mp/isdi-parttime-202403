function unshift(array){
    for (var j = arguments.length-1; j>0 ; j--){
        element = arguments[j]
        for ( var i = array.length; i >0; i--){
            array[i] = array[i-1]
        }
        array[0] = element
        return element
    }
}





var array1 = [1, 2, 3];

console.log(unshift(array1, 4));
// Expected output: 4

console.log(array1);
// Expected output: Array [4, 1, 2, 3]


console.info('CASE unchist more than one element')

var array1 = [1, 2, 3];

console.log(unshift(array1,4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]

 