function concat (array1, array2) {
    var j = 0
    var i = array1.length

        for (i ; j < array2.length; i++, j++ ) {

            var newArrayConcat= array1
            
            newArrayConcat[i] = array2[j]
        }
        return newArrayConcat
    }
    
var numbers = [1 , 2 , 3 , 4]
var charc = ['a','b','c','d']
var names = ['Pepe','Karen','Carlos']
    
concat(numbers, names)


//-------------------------------------

function concat () {
    var newArrayConcat = []
    var newArrayIndex = 0 

    for ( var i = 0; i < arguments.length; i++) {
        var currentArray = arguments[i]

        for ( var j = 0; j < currentArray.length ;j++,newArrayIndex++) {
            newArrayConcat[newArrayIndex] = currentArray[j]
            

    }
}
return newArrayConcat

}

var numbers = [1 , 2 , 3 , 4]
var charc = ['a','b','c','d']
var names = ['Pepe','Karen','Carlos']

concat(numbers, names, charc)