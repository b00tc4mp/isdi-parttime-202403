function indexOf (array, element, index) {
    if(index===undefined) index = 0

    for ( index; index < array.length; index++)
    if(array[index]===element){
        return index
    } 
    return -1
}

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

indexOf(beasts, 'bison', 2)