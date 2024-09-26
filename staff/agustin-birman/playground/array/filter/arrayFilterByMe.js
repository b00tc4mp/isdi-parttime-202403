function filter (array, callback, index) {
    if(index ===undefined) index = 0
    var filteredArray = []

    for ( index ; index < array.length ; index++){

        var element = array[index]

        var matches = callback(element, index, array)

        if(matches){
            filteredArray[filteredArray.length] = element

        } 
    }

    return filteredArray
}


const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

function moreThan6letters (element) {
    return element.length > 6
}
 
filter(words, moreThan6letters)


