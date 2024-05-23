/*
function unshift(array, element) {
    var result = [];// declara la funcion
    result[0] = element;// asignamos el valor element al primer indice del array

    for (var i = 0; i < array.length; i++) { // iteramos sobre el array
        result[i + 1] = array[i];// en cada bucle le asignamos el valor del elemento en la posicion i y incrementa su indice en 1
    }
    return result; // devuelve la nueva longitud del array
}


function unshift(array){

    var result = []

    for(var i = 1; i <arguments.length; i++){
        result[result.length] = arguments[i]
    }

    return result;
}
*/

delete Array.prototype.unshift

function unshift(array){

    var result = []// creamos array

    // estos elementos se agregan al resuñt
    for(var i = 1; i <arguments.length; i++){
        result[result.length] = arguments[i]// agregamos cada argumento al array
    }

    // copiamos los elementos del array orginal al nuevo
    for(var j = 0; j < array.length; j++){
        result[result.length] = array[j]
    }

    return result; // retornamos el array 
}

console.info('CASE add the numbers to the beginning of the array')

var num = [1, 2, 3];

console.debug(unshift(num, 4, 5));
//[4, 5, 1, 2, 3]

console.debug(num);
//[1, 2, 3]

console.info('CASE add the numbers in the array')

var num2 = [1, 2];

console.debug(unshift(num2, 0)); // 3 
//[0, 1, 2]

console.debug(unshift(num2, -2, -1)); // 5
//[-2, -1, 1, 2]

console.debug(unshift(num2,[-3]));
//[[-3], 1, 2]