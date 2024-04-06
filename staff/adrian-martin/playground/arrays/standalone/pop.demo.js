/*
function pop(array){

    if(array.length === 0){
        return undefined

    }else{
        return array[array.length - 1]
    }  
}

function pop(array){

    if(array.length === 0){
        return undefined

    }else{
        var lastElement = array[array.length - 1] 

        lastElement = lastElement.length - 1  

        return lastElement
    }  
}
delete Array.prototype.pop*/


function pop(array){

    if(array.length === 0){
        return undefined

    }else{
        var lastElement = array[array.length - 1] 
        // declara variable que almacena el ultimo valor del array

        array.length = array.length - 1
        // modifica la propiedad lenght reduciendo su longitud en uno

        return lastElement
        //retorna el ultimo valor
    }  
}


console.info('CASE remove the last fruit in the array')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.debug(pop(plants));
// "tomato"

console.debug(plants);
// ["broccoli", "cauliflower", "cabbage", "kale"]

pop(plants);

console.debug(plants);
// ["broccoli", "cauliflower", "cabbage"]

console.info('CASE remove the last fish in the array and collect it in an array')

var myFish = ["angel", "clown", "mandarin", "sturgeon"];

var popped = pop(myFish);

console.debug(myFish); 
// ['angel', 'clown', 'mandarin' ]

console.debug(popped); 
// 'sturgeon'