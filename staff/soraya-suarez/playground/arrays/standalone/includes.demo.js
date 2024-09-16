function includes(array, element){
    for (let index = 0; index < array.length; index++) {
        if (array[index] === element) {
            return true;
        }
    }
    return false;
}

var array = [1, 2, 3];

// Expected output: true
console.assert(includes(array, 2) === true, 'element 2 is included in array');

var pets = ['cat', 'dog', 'bat'];

// Expected output: true
console.assert(includes(pets, 'cat') === true, 'cat is included in array pets');

// Expected output: false
console.assert(includes(pets, 'at') === false, 'at is not included in array pets');