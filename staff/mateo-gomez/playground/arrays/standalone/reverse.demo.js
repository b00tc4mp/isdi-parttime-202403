delete Array.prototype.reverse

function reverse(array) {
   // nums -> ['one', 'two', 'three']

    // nums[0] = nums[2]
    // nums[1] = nums[1]
    // nums[2] = nums[0]
    if (array.length === 3){
        var left = array[0]
        var right = array[2]

        array[0] = right
        array[2] = left

        //for (var i = nums.length - 1; i >= 0; i--){
        // var element = nums[i]
            
        // nums[nums.length - 1 - i] = element
    // }

            return nums

    } else if (array.length === 4) {
       // array -> ['one', 'two', 'three', 'four']

       var left = array[0]
       var right = array[3]

       array[0] = right 
       array[3] = left

       left = array[1]
       right = array[2]

       array[1] = right
       array[2] = left

       return array

    }else if (array.length === 5) {
        // array -> ['one', 'two', 'three', 'four', 'five']

        var left = array[0]
        var right = array[4]
 
        array[0] = right 
        array[4] = left
 
        left = array[1]
        right = array[3]
 
        array[1] = right
        array[3] = left

        return array
    } else if (array.length === 6) {
        // array -> ['one', 'two', 'three', 'four', 'five', 'six']

        //var left = array[0]
        //var right = array[5]
 
        //array[0] = right 
        //array[5] = left
 
       // left = array[1]
        //right = array[4]
 
        //array[1] = right
        //array[4] = left

        //left = array[2]
        //right = array[3]
 
        //array[2] = right
        //array[3] = left

        //return array


    }else if (array.length >= 4){
        var left, right

        for (var i = 0; i < array.length/2; i++){
            left = array[i]
            right = array[array.length -1 -i]

            array[i] = right
            array[array.length - 1 -i] = left
        }

        return array
        
    }
}



console.info('CASE revert elements from an array')

var array1  = ['one', 'two', 'three'];
//var result = array1.reverse()

var result = reverse(array1)

console.assert(result.length === 3, 'the array length is 2')
console.assert(result[0] === 'three', 'the array in 0 is three')
console.assert(result[1] === 'two', 'the array in 1 is two')
console.assert(result[2] === 'one', 'the array in 2 is one')
 


console.info('CASE invert 4 elements from an array')

var nums  = ['one', 'two', 'three', 'four'];

var result = nums.reverse()


console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 4, 'the array length is 4')
console.assert(result[0] === 'four', 'the array in 0 is four')
console.assert(result[1] === 'three', 'the array in 1 is three')
console.assert(result[2] === 'two', 'the array in 2 is two')
console.assert(result[3] === 'one', 'the array in 3 is one')
 console.assert(result === nums, 'result is nums')


 console.info('CASE invert 5 elements from an array')

 var nums  = ['one', 'two', 'three', 'four', 'five'];
 
 var result = nums.reverse()
 
 
 
 
 
  console.assert(result instanceof Array, 'result is an array')
 console.assert(result.length === 5, 'the array length is 5')
 console.assert(result[0] === 'five', 'the array in 0 is five')
 console.assert(result[1] === 'four', 'the array in 1 is four')
 console.assert(result[2] === 'three', 'the array in 2 is three')
 console.assert(result[3] === 'two', 'the array in 3 is two')
 console.assert(result[4] === 'one', 'the array in 4 is one')
  console.assert(result === nums, 'result is nums')