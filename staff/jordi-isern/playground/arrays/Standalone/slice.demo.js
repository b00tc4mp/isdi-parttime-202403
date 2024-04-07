const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

function slice(array,start,end){
    var sliced = []
    if(start === undefined && end === undefined){
        sliced = array
    }
    
    if(end === undefined){
        end = array.length
    }
    if(start < 0){
        start = array.length +start
    }
    if(end < 0){
        end = array.length + end
    }

    for (var i = start; i < end; i++){
        sliced[sliced.length] = array[i]
    }
    return sliced
}


console.info('CASE start defined end not defined')
console.log(slice(animals,2));
// Expected output: Array ["camel", "duck", "elephant"]


console.info('CASE start and end defined')
console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]


console.info('CASE diferent start and end')
console.log(slice(animals, 1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]


console.info('CASE start defined in negative')
console.log(slice(animals ,-2));
// Expected output: Array ["duck", "elephant"]


console.info('CASE normal start end denifed in negative')
console.log(slice(animals ,2, -1));
// Expected output: Array ["camel", "duck"]


console.info('CASE no end no start')
console.log(slice(animals));
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
