function join (array, element) {
    var newString = ''
    for ( var i = 0; i < array.length; i++){

        if(i !== array.length -1) {
        newString += array[i] + element
        } else {
        newString += array[i]}
        
    }

    return newString
}

var elements = ['Fire', 'Air', 'Water'];
join(elements, '-')