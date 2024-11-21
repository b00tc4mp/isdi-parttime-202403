//node staff/debora-garcia/playground/arrays/standalone/slice.demo.js

/* function slice(array, start) {
    var sliced = []
    for (var i = start; i < array.length; i++) {
        var element = array[i];

        // sliced[i-start]=element 
        sliced[sliced.length] = element

    }
    return sliced
}

function slice(array, start, end) {
    var sliced = []

    if (end === undefined) {
        if (start > 0) {
            for (var i = start; i < array.length; i++) {
                var element = array[i]

                sliced[sliced.length] = element
            }
        } else if (start < 0) {
            var fromIndex = array.length + start

            for (var i = fromIndex; i < array.length; i++) {
                var element = array[i]

                sliced[sliced.length] = element
            }
        }
    } else {
        if (start >= 0) {
            if (end > 0) {
                for (var i = start; i < end; i++) {
                    var element = array[i]

                    sliced[sliced.length] = element
                }
            } else if (end < 0) {
                var toIndex = array.length + end

                for (var i = start; i < toIndex; i++) {
                    var element = array[i]

                    sliced[sliced.length] = element
                }
            }
        } else {
            if (end < 0) {
                var fromIndex = array.length + start
                var toIndex = array.length + end

                for (var i = fromIndex; i < toIndex; i++) {
                    var element = array[i]

                    sliced[sliced.length] = element
                }
            } else if (end > 0) {
                var fromIndex = array.length + start

                for (var i = fromIndex; i < end; i++) {
                    var element = array[i]

                    sliced[sliced.length] = element
                }
            }
        }
    }

    return sliced
} */


//REFACTORIZANDO FACTOR COMUN BUCLE FOR
/* 

function slice(array, start, end) {
    var sliced = [];
    var fromIndex, toIndex;



    if (end === undefined) {
        toIndex = array.length;
        if (start > 0) {
            fromIndex = start;
        } else if (start < 0) {
            fromIndex = array.length + start;
        }
    } else {
        if (start >= 0) {
            if (end > 0) {
                fromIndex = start;
                toIndex = end
            } else if (end < 0) {
                fromIndex = start;
                toIndex = array.length + end;
            }
        } else {
            if (end < 0) {
                fromIndex = array.length + start
                toIndex = array.length + end
            } else if (end > 0) {
                fromIndex = array.length + start;
                toIndex = end

            }
        }
    }

    for (var i = fromIndex; i < toIndex; i++) {
        var element = array[i]

        sliced[sliced.length] = element
    }

    return sliced;
}
 */

// FUNCION REFACTORIZADA CON OPERADOR TERNARIO
function slice(array, start, end) {
    var sliced = [];
    var fromIndex, toIndex;

    fromIndex = start === undefined ? 0 : (start < 0 ? array.length + start : start)
    toIndex = end === undefined ? array.length : (end < 0 ? array.length + end : end)

    for (var i = fromIndex; i < toIndex; i++) {
        var element = array[i]

        sliced[sliced.length] = element
    }

    return sliced;
}

console.info("**CASE extract animals from index 2**")

var animals = ["ant", "bison", "camel", "duck", "elephant"];

var result = slice(animals, 2);

console.assert(result.length === 3, "result length is 3")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is camel")
console.assert(result[2] === "elephant", "result animal at 2 is elephant")
// slice no modifica el array original,  extrae un fragmento y lo devuelve en un nuevo array
console.assert(animals.length === 5, "animal length is 5")

console.info("**CASE extract last 2 animals**")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, -2)
// Expected output: Array ["duck", "elephant"]

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "duck", "result animal at 0 is duck")
console.assert(result[1] === "elephant", "result animal at 1 is elephant")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract last 4 animals")

var animals = ["ant", "bison", "camel", "duck", "elephant", "bear"]

var result = slice(animals, -4)

console.assert(result.length === 4, "result length is 4")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is duck")
console.assert(result[2] === "elephant", "result animal at 2 is elephant")
console.assert(result[3] === "bear", "result animal at 3 is bear")

console.assert(animals.length === 6, "animals length is 6")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")
console.assert(animals[5] === "bear", "animals at 5 is bear")

console.info("CASE extract animals from index 2 to 4")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, 2, 4)

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is duck")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract animals from index 1 to 5")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, 1, 5)

console.assert(result.length === 4, "result length is 4")
console.assert(result[0] === "bison", "result animal at 0 is bison")
console.assert(result[1] === "camel", "result animal at 1 is camel")
console.assert(result[2] === "duck", "result animal at 2 is duck")
console.assert(result[3] === "elephant", "result animal at 3 is elephant")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index 2 to -1")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, 2, -1)

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is duck")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index 0 to -2")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, 0, -2)

console.assert(result.length === 3, "result length is 3")
console.assert(result[0] === "ant", "result animal at 0 is ant")
console.assert(result[1] === "bison", "result animal at 1 is bison")
console.assert(result[2] === "camel", "result animal at 2 is camel")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index -4 to -2")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, -4, -2)

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "bison", "result animal at 0 is bison")
console.assert(result[1] === "camel", "result animal at 1 is camel")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index -3 to -2")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, -3, -2)

console.assert(result.length === 1, "result length is 1")
console.assert(result[0] === "camel", "result animal at 0 is camel")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index -4 to 3")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, -4, 3)

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "bison", "result animal at 0 is bison")
console.assert(result[1] === "camel", "result animal at 1 is camel")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index -5 to 4")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals, -5, 4)

console.assert(result.length === 4, "result length is 4")
console.assert(result[0] === "ant", "result animal at 0 is ant")
console.assert(result[1] === "bison", "result animal at 1 is bison")
console.assert(result[2] === "camel", "result animal at 2 is camel")
console.assert(result[3] === "duck", "result animal at 3 is duck")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract a copy of animals")

var animals = ["ant", "bison", "camel", "duck", "elephant"]

var result = slice(animals)

console.assert(result.length === 5, "result length is 5")
console.assert(result[0] === "ant", "result at 0 is ant")
console.assert(result[1] === "bison", "result at 1 is bison")
console.assert(result[2] === "camel", "result at 2 is camel")
console.assert(result[3] === "duck", "result at 3 is duck")
console.assert(result[4] === "elephant", "result at 4 is elephant")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.assert(result !== animals, "result is not the same instance as animals (different references)")



