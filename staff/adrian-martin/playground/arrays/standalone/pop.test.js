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

var poped = pop(plants)

console.assert(poped === 'tomato', 'poped return tomato')
console.assert(plants.length === 4, 'plants lengths is 4')
console.assert(plants[0] === 'broccoli', 'plant index 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plant index 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plant index 2 is cabbage')
console.assert(plants[3] === 'kale', 'plant index 3 is kale')

pop(plants);

console.assert(plants.length === 3, 'plants lengths is 4')
console.assert(plants[0] === 'broccoli', 'plant index 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plant index 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plant index 2 is cabbage')



console.info('CASE remove the last fish in the array and collect it in an array')

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

var popped = pop(myFish);

console.assert(popped === 'sturgeon')
console.assert(myFish.length === 3)
console.assert(myFish[0] === 'angel', 'fish index 0 is angel')
console.assert(myFish[1] === 'clown', 'fish index 1 is clown')
console.assert(myFish[2] === 'mandarin', 'fish index 2 is mandarin')