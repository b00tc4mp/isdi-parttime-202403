function shift(array){
    var shift = array[0]
    for(i = 1; i<array.length; i++){
    array[i-1] = array[i]
    }
    array.length = array.length -1
    return shift
}


var array1 = [1, 2, 3];

var firstElement = shift(array1);

console.log(array1);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1


const myFish = ["angel", "clown", "mandarin", "surgeon"];

console.log("myFish before:", myFish);
// myFish before: ['angel', 'clown', 'mandarin', 'surgeon']


