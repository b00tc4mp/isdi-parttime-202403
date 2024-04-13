// debugger

// function flat (array, depth) {

//     if (depth === undefined) {
//         depth = 1
//     }

//     var flatteredArray = [];

//     for( var i = 0; i < array.length; i++) {

//         var element = array[i]
        
//         if (Array.isArray(element) || element === undefined) {

//             depth -1

//             // if(Array.isArray(element)){
//             // flat(array)
//             // }
//         }

//         flatteredArray[i] = element 

//     }
//     return flatteredArray
// }

// const array = [1, , 3, ["a", , "c"]];

// console.log(flat(array))


function flat (array) {

    var flatteredArray = []

    for ( var i=0; i < array.length; i++) {

        var element = array[i]

        if(element ===undefined) {
            i--
        } else {
            flatteredArray[i] = element
        }
    }
    return flatteredArray
}

var array12 = [1, , 3, ["a", , "c"]]

console.log(flat(array12))