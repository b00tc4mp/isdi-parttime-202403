//HECHO

function findIndex (array, callback) {
  
    for(var i = 0; i < array.length; i++){
        var position = i
        var element = array[i]
    var elementFind = callback(element, i, array)
    if(elementFind === true)
    return position
    
}
return -1


}



console.info('CASE return the first element that satisfies the testing function')
var array1 = [5, 12, 8, 130, 44];

var isLargeNumber = function (element) {return element > 13};

console.debug(findIndex(array1, isLargeNumber));
// Expected output: 3


console.info('CASE Find the index of a prime number in an array ')
function isPrime(element) {
    if (element % 2 === 0 || element < 2) {
      return false;
    }
    for (var factor = 3; factor <= Math.sqrt(element); factor += 2) {
      if (element % factor === 0) {
        return false;
      }
    }
    return true;
  }
  
  console.log(findIndex([4, 6, 8, 9, 12], isPrime)); // -1, not found
  console.log(findIndex([4, 6, 7, 9, 12], isPrime)); // 2 (array[2] is 7)

  console.info('CASE using the third argument of callbackFn')