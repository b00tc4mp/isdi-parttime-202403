
function map (array, callback){
    for (var i = 0; i < array.length; i++){
        element = array[i]
        callback(element , i)
       }
}
var nums = [1, 4, 9, 16];
numsBy2 = []
map(nums, function (num, j){numsBy2[j] = num *2})

console.log(numsBy2)