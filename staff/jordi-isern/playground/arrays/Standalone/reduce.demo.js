var array1 = [1, 2, 3, 4];
function reduce(array, fun, initialValue){
    for (var i = 0 ; i < array.length; i++){
        var j = initialValue
        
    }
    return 
}


// 0 + 1 + 2 + 3 + 4
var initialValue = 0;
var sumWithInitial = reduce(array1,
  function callback(accumulator, currentValue){
    accumulator = accumulator + currentValue 
    return accumulator},
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10