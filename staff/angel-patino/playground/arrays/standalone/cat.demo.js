//HECHO
function cat( arr1, arr2, callback){

    callback(concat = arr1+','+arr2);

}


var  letters = ["a", "b", "c"];
const num2 = [2, [3]];

cat(letters,num2,function(concat) { console.log(`Your new array is ${concat}`)})