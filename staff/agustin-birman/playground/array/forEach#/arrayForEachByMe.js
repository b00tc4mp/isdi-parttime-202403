debugger

function forEach (array, callback, index) {
    if(index===undefined) index = 0

    for(var index ; index < array.length; index++) {
        
        var element = array[index]
        
        callback(element)

    }
}

function print(element) {
    console.log(element)
}

var array1 = ['a', 'b', 'c'];

forEach(array1, print , 1 )