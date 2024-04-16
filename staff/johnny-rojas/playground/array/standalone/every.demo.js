// //delete Array.prototype.every

// function every(array, callback) {
//   for (var i = 0; i < array.length; i++) {
//     if (!callback(array[i], i, array)) {
//       return false;
//     }
//   }
//   return true;
// }

// //------------------------------------------------

// console.info('CASE smaller than 4')

// var array = [1, 2, 3]
// var result = every(array, function (element) {
//   return element < 4
// });
// console.debug(result)
// //true
// console.assert(array[0] < 4, '1 is smaller than 4')
// console.assert(array[1] < 4, '2 is smaller than 4')
// console.assert(array[2] < 4, '3 is smaller than 4')

// //------------------------------------------------

// console.info('CASE bigger than 4')

// var array = [1, 2, 3]
// var result = every(array, function (element) {
//   return element > 4
// })
// console.debug(result)
// //false
// console.assert(array[0] > 4, '1 is bigger than 4')
// console.assert(array[1] > 4, '2 is bigger than 4')
// console.assert(array[2] > 4, '3 is bigger than 4')

