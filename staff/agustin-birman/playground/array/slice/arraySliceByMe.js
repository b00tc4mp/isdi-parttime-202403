function slice (array, indexStart, indexEnd) {
    if(indexStart===undefined) indexStart = 0
    if(indexEnd===undefined) indexEnd = array.length
    var arraySliced = []
    var startArray = 0


    if(indexStart < 0 && indexEnd < 0){
        indexStart = array.length + indexStart
        indexEnd= array.length + indexEnd
        
    } else if(indexStart >= 0 && indexEnd > 0){ // nada cambia

    } else if(indexStart >= 0 && indexEnd < 0){
        indexEnd= array.length + indexEnd
       
    } else { //(indexStart < 0 && indexEnd > 0)
        indexStart = array.length + indexStart

    }

    for(indexStart; indexStart < indexEnd; indexStart++, startArray++) {
        
        arraySliced[startArray] = array[indexStart]

    }

    return arraySliced
}


var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

slice(animals, -3,-1)