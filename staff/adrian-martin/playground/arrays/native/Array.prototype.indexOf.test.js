console.info('CASE search the animals in array')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.debug(beasts.indexOf('bison'));
// Expected output: 1

console.debug(beasts.indexOf('bison', 2));
// Expected output: 4

console.debug(beasts.indexOf('giraffe'));
// Expected output: -1

console.info('CASE search de value in array')

var numb = [2, 9, 9];

console.debug(numb.indexOf(2))
// 0 // como 2 esta en la primera posicion imprimira 0

console.debug(numb.indexOf(7))
// -1 // como 7 no esta en el array imprimira -1

console.debug(numb.indexOf(9, 2))
// 2 // como hay dos nueves pero la busqueda empieza en el indice 2(3º elemento) imprimira 2

console.debug(numb.indexOf(2, -1))
// -1 // no es valido buscar con un indice negativo, imprimira -1

console.debug(numb.indexOf(2, -3))
// 0 // dado que el array tiene solo tres elementos, la posición -3 se refiere al primer elemento (índice 0) desde el final