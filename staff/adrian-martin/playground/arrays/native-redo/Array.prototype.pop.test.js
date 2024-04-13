//delete Array.prototype.pop


Array.prototype.pop = function(){

    if(this.length === 0){
        return undefined

    }else{
        var lastElement = this[this.length - 1] 

        this.length = this.length - 1

        return lastElement

    }  
}


console.info('CASE remove the last fruit in the array')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var poped = plants.pop()

console.assert(poped === 'tomato', 'poped return tomato')
console.assert(plants.length === 4, 'plants lengths is 4')
console.assert(plants[0] === 'broccoli', 'plant index 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plant index 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plant index 2 is cabbage')
console.assert(plants[3] === 'kale', 'plant index 3 is kale')

plants.pop();

console.assert(plants.length === 3, 'plants lengths is 4')
console.assert(plants[0] === 'broccoli', 'plant index 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plant index 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plant index 2 is cabbage')



console.info('CASE remove the last fish in the array and collect it in an array')

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

var popped = myFish.pop();

console.assert(popped === 'sturgeon')
console.assert(myFish.length === 3)
console.assert(myFish[0] === 'angel', 'fish index 0 is angel')
console.assert(myFish[1] === 'clown', 'fish index 1 is clown')
console.assert(myFish[2] === 'mandarin', 'fish index 2 is mandarin')
