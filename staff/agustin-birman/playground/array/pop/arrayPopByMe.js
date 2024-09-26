function pop(array) {
    var popElement = array[array.length -1]
    array.length--

    return popElement
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
var deleteElement = pop(plants)

console.debug(plants)
console.debug(deleteElement)

//Test

console.assert(deleteElement=== 'tomato' , 'tomato is the lest array element')
console.assert(plants[0]=== 'broccoli' , 'broccoli is the lest array element')
console.assert(plants[1]=== 'cauliflower' , 'cauliflower is the lest array element')
console.assert(plants[2]=== 'cabbage' , 'cabbage is the lest array element')
console.assert(plants[3]=== 'kale' , 'kale is the lest array element')
console.assert(plants[4]=== undefined , 'there is not element there')


