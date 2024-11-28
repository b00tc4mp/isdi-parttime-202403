function reverse(array) {
    var izq, der

    for(var i = 0, j = array.length - 1; i < j; i++, j--) {
        izq = array[i]
        der = array[j]

        array[i] = der
        array[j] = izq
    }
    return array

    // el barra 2 se pone cuando un array es impar

  //  if(array.length === 3) {
//
  //  var izq = array[0]
  //  var der = array[2]
//
  //  array[0] =  der
  //  array[2] =  izq
//
  //  return array
//} else if (array.length === 4) {
  //  var izq = array[0] 
  //  var der = array[3] 
//
  //  array[0] = der     
  //  array[3] = izq   
//
  //  izq = array[1]    
  //  der = array[2]    
//
  //  array[1] = der
  //  array[2] = izq

   // return array
//}
}

// CASO invertir 3 posiciones

var nums = ['one', 'two', 'three']
var result = reverse(nums)

console.assert(result.length === 3, 'la longitud es 3')
console.assert(result[0] === 'three', 'el resultado del indice 0 es three')
console.assert(result[1] === 'two', 'el resultado del indice 1 es two')
console.assert(result[2] === 'one', 'el resultado del indice 2 es one')
console.assert(result === nums, 'el resultado es nums')
console.log(result)

// CASO invertir 4 posiciones

var nums = ['one', 'two', 'three', 'four']
var result = reverse(nums)

console.log(result)
console.assert(result.length === 4, 'la longitud es 4')
console.assert(result[0] === 'four', 'el resultado del indice 0 es four')
console.assert(result[1] === 'three', 'el resultado del indice 1 es three')
console.assert(result[2] === 'two', 'el resultado del indice 2 es two')
console.assert(result[3] === 'one', 'el resultado del indice 3 es one')
console.assert(result === nums, 'el resultado es nums')