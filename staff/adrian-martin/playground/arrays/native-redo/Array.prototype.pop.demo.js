//delete Array.prototype.pop


Array.prototype.pop = function(){

    if(this.length === 0){
        return undefined

    }else{
        var lastElement = this[this.length - 1] 
        // declara variable que almacena el ultimo valor del array

        this.length = this.length - 1
        // modifica la propiedad lenght reduciendo su longitud en uno

        return lastElement
        //retorna el ultimo valor
    }  
}


console.info('CASE remove the last fruit in the array')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.debug(plants.pop());
// "tomato"

console.debug(plants);
// ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.debug(plants);
// ["broccoli", "cauliflower", "cabbage"]

console.info('CASE remove the last fish in the array and collect it in an array')

var myFish = ["angel", "clown", "mandarin", "sturgeon"];

var popped = myFish.pop();

console.debug(myFish); 
// ['angel', 'clown', 'mandarin' ]

console.debug(popped); 
// 'sturgeon'