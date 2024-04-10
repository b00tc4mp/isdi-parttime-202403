delete Array.prototype.sort

// Recrear el metodo sort


function sort(array, compareFunction) {




  return array;
}




console.info("--- CASE ordenar elementos de un array y devolver un nuevo array ordenado de acuerdo con su valor Unicode ")

var months = ['March', 'Jan', 'Feb', 'Dec'];
var monthsSorted = sort(months)
console.log(monthsSorted);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

var numbers = [1, 30, 4, 21, 100000];
numbers = sort(numbers);
console.log(numbers);
// Expected output: Array [1, 100000, 21, 30, 4]
