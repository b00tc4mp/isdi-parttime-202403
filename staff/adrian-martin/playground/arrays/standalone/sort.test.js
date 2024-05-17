delete Array.prototype.sort

// Recrear el metodo sort
function sort(array) {
// Array [1, 30, 4, 21, 100000]

    
        var len = array.length;
        for (var i = 0; i < len ; i++) {
            for(var j = 0 ; j < len - i - 1; j++){ 
                if (array[j].toString() > array[j + 1].toString()) {
                    var temp = array[j];
                    array[j] = array[j + 1];
                    array[j+1] = temp;
                }
            }
        }
        console.log(array)
        return array;
    }

    // var result = []

    // for(var i = 0; i < array.length; i++){
    //     var element = array[i].toString()

    //     console.log(element)

    //     for(var j = 0; j < element.length; j++){
    //         var element2 = element[j]

    //         console.log(element2)

    //         if (element[j] > element[j + 1]) {

    //             var temp = element[j];
    //             element[j] = element[j + 1];
    //             element[j+1] = temp;
    //         }
    //     }
    // }
    // return element;
    
// function sort(array, comparador) {
//     // Si no se proporciona un comparador, se utiliza la comparación por defecto
//     if (!comparador) {
//       comparador = function (a, b) {
//         if (a < b) return -1;
//         if (a > b) return 1;
//         return 0;
//       };
//     }
  
//     // Recorremos la matriz intercambiando elementos
//     for (let i = 0; i < array.length; i++) {
//       for (let j = i + 1; j < array.length; j++) {
//         const resultadoComparacion = comparador(array[i], array[j]);
  
//         if (resultadoComparacion > 0) {
//           [array[i], array[j]] = [array[j], array[i]];
//         }
//       }
//     }
//     console.debug(array)
//     // Devolvemos la matriz ordenada
//     return array;
// }


// quokka  ctrl + k , q

// var result = []

//     for(var i = 0; i < array.leSngth; i++){
//             var element = array[i]

//             for(var j = i + 1; j < array.length; j++){
//                 var element2 = array[j]

//                 if(element > element2){

//                 var orden = element
//                 element = element2
//                 element2 = orden
//             }

            
//     }
//     console.log(result)
// }

// Array [1, 30, 4, 21, 100000]

// Array [1, 100000,21, 30, 4,] resultado

// var result = []

// for(var i = 0;i < array.lenght; i++){
//     var element = array[i]

//     for(var j = i + 1; j < array[i].lenght; j++){
//         var element2 = array[j]

//         if(array[i] < array[j]){
//             result[result.lenght] = element
//         }else{
//             result[result.lenght] = element2
//         }
//     }

//     console.log(result)
// }

//     var result = []

//     if(array[0] < array[1]){

//         result[result.length] = array[0]
//     }else{
//         result[result.length] = array[1]
//     }

//     if(array[1] < array[2]){
//         result[result.length] = array[1]
//     }else{
//         result[result.length] = array[2]
//     }

//     console.log(result)

// //     var result = []

// //     if(array[0] < array[1]){

// //         result[result.length] = array[0]
// //     }else{
// //         result[result.length] = array[1]
// //     }

// //     if(array[1] < array[2]){
// //         result[result.length] = array[1]
// //     }else{
// //         result[result.length] = array[2]
// //     }

// //     console.log(result)

console.info("--- CASE ordenar elementos de un array y devolver un nuevo array ordenado de acuerdo con su valor Unicode ")

var numbers = [1, 30, 4, 21, 100000];
sort(numbers);
//console.log(numbers);
// Expected output: Array [1, 100000, 21, 30, 4]

//! TEST ASSERT
console.assert(numbers[0] === 1, 'index 0 is 1')
console.assert(numbers[1] === 100000, 'index 1 is 100000')
console.assert(numbers[2] === 21, 'index 2 is 21')
console.assert(numbers[3] === 30, 'index 3 is 30')
console.assert(numbers[4] === 4, 'index 4 is 4')

//? --------------------------------------------------------------------------

// console.info("--- CASE ordenar elementos de un array y devolver un nuevo array ordenado de acuerdo con su valor Unicode ")

// var months = ['March', 'Jan', 'Feb', 'Dec'];
// sort(months);
// console.log(months);
// // Expected output: Array ["Dec", "Feb", "Jan", "March"]

// //! TEST ASSERT
// console.assert(months[0] === 'Dec', 'index 0 is Dec')
// console.assert(months[1] === 'Feb', 'index 1 is Feb')
// console.assert(months[2] === 'Jan', 'index 2 is Jan')
// console.assert(months[3] === 'March', 'index 3 is March')

//? --------------------------------------------------------------------------