
/*
function includes(array, index){
    for(var i = 0; i < array.length; i++){
        if(index === array[i])
            return true
    }
    return false
}

delete Array.prototype.includes


function includes(array, element, index){

    index = index || 0

    if(index < 0)
        index = array.length + index

    for(var i = 0; i < array.length; i++){
        if(array[i] === index)
        return true
    }
    return false
}
*/

function includes(array, element, index) {
    if (index === undefined) { //  si no nos proporcionan index tomara el valor de 0
        index = 0;

    //si el index es negativo
    } else if (index < 0) {//cuando sea negativo se le suma la longitud del array , asi se vuelve positivo
        index = array.length + index;
        if (index < 0) { //con esto nos aseguramos que index no sea menor que 0
            index = 0;
        }
    }
    for (var i = index; i < array.length; i++) {
        if ((isNaN(array[i]) && isNaN(element))) {
            return true;
        }
    }
    return false;
}

console.info('CASE check numbers')

var num= [1, 2, 3];

console.debug(includes(num,2));
// true

console.info('CASE check the animals')

var pets = ['cat', 'dog', 'bat'];

console.debug(includes(pets,'cat'));
// true

console.debug(includes(pets,'at'));
//  false

console.info('CASE check the numbers 2')

console.debug(includes([1, 2, 3],2))
// true

console.debug(includes([1, 2, 3],4))
// false

console.debug (includes([1, 2, 3],3, 3))
// false

console.debug (includes([1, 2, 3],3, -1))
// true

console.debug (includes([1, 2, NaN],NaN))
// true

console.debug (includes(["1", "2", "3"],3))
// false

console.log('CASE from index is greater or equal than lenght the matriz')

var num = ["a", "b", "c"];

console.debug (includes(num,"c", 3))
// false

console.debug (includes(num,"c", 100))
// false