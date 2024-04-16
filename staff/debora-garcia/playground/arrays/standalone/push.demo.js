/* 
function push(array,element){
array[array.length]=element
return array.length
}
esta funcion funcionaria si solo se  añadiera un solo elemento en el array, pero en el caso de 
añadir n elementos no funcionaria. Por eso usamos el parametro "arguments" que devuelve todos los 
elementos pasados en una funcion. Ej:

arguments:
[[array],elemento1,elemento2....].
de manera que en arguments[0]=array
aguments[1]=elemento 1
...
*/

function push(array) { //[[array],"n1","n2",...] inyectar a partir de i=1 
                    
    for (var i = 1; i < arguments.length; i++) {
       var argument= arguments[i] // =n1
        
        array[array.length] = argument
        //en la ultima posicion del array colocará n1
    }
    return array.length

}

console.info("** CASE add animal to array **")

var animals = ['pigs', 'goats', 'sheep'];

var count = push(animals, 'cows');

console.log(count);

console.assert(count===4,"count is 4") // para no tener que hacer comprobacion manual añadimos los valores que queremos que verifique


console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows"]
console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals.length === 4, 'animals length is 4')

//------------------------------------------------------

console.info('CASE add various animals to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = push(animals,'chickens', 'cats', 'dogs')
console.debug(count)
// 7
console.assert(count === 7, 'count is 7')

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals[4] === 'chickens', 'animals 4 is chickens')
console.assert(animals[5] === 'cats', 'animals 5 is cats')
console.assert(animals[6] === 'dogs', 'animals 6 is dogs')
console.assert(animals.length === 7, 'animals length is 7')

//------------------------------------------------------

console.info('CASE add no element to array')

//El metodo nativo también devuelve la longitud del array aunque no se le pasa ningun argumento

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = push(animals)

console.debug(count)
// 4
console.assert(count === 4, 'count is 4')

console.debug(animals)
// ['pigs', 'goats', 'sheep', 'cows']
console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals.length === 4, 'animals length is 4')

// node staff/debora-garcia/playground/arrays/standalone/push.demo.js 