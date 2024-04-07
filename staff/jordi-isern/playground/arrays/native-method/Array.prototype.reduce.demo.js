var array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
var initialValue = 0;
var sumWithInitial = array1.reduce(
  function callback(accumulator, currentValue){
    accumulator = accumulator + currentValue 
    return accumulator}, initialValue
);

console.log(sumWithInitial);
// Expected output: 10