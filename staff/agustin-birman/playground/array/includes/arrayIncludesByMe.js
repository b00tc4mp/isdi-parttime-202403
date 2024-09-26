debugger

function includes (array, element, index) {
    if(index===undefined) {
        index = 0
    }

for (index; index < array.length; index++ ) {

        if(array[index]=== element) {
        return true

        }
    }
    return false
}


const array1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
includes(array1, 4, 2)