delete Array.prototype.indexOf
/*

function indexOf(array, value){
    for(var i = 0; i < array.length; i++){
        if( array[i] === value)
            return i
    }
    return -1
}

function indexOf(array, index){
    for(var i = 0; i < array.length; i++){
        if( array[i] === index)
            return i
    }

    return -1
}

function indexOf(array, index, startIndex){

    startIndex = startIndex || 0;

    for(var i = startIndex; i < array.length; i++){
        if(array[i] === index)
            return i
    }
    return -1
}
*/

function indexOf(array, target, index){ 
// array buscar el valor; target el valor que queremos buscar en el array; index parametro opcional que indica a parti de que indice comenzar

    index = index || 0;

    //si index es negativo, lo convertimos a un indice valido
    if(index < 0)
        index = array.length + index;
        if (index < 0) index = 0;

    for(var i = index; i < array.length; i++){ //iteramos sobre los elementos del array
        if(array[i] === target) //comparamos el elmento i del array con el target
            return i //si es igual que index lo devuelve
    }
    return -1 //sino coincide con ninguno
}

console.info('CASE search the animals in array')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.debug(indexOf(beasts, 'bison'));
//1

console.debug(indexOf(beasts, 'bison', 2));
//4 

console.debug(indexOf(beasts, 'giraffe'));
//-1

console.info('CASE search de value in array')

var numb = [2, 9, 9];

console.debug(indexOf(numb, 2))
//0

console.debug(indexOf(numb, 7))
//-1

console.debug(indexOf(numb, 9, 2))
//2

console.debug(indexOf(numb, 2, -1))
//-1

console.debug(indexOf(numb, 2, -3))
//0
