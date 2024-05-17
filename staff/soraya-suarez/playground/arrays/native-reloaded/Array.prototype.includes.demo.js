delete Array.prototype.includes;

Array.prototype.includes = function (element){
    for (let index = 0; index < this.length; index++) {
        if (this[index] === element) {
            return true;
        }
    }
    return false;
}

var array = [1, 2, 3];

// Expected output: true
console.assert(array.includes(2) === true, 'element 2 is included in array');

var pets = ['cat', 'dog', 'bat'];

// Expected output: true
console.assert(pets.includes('cat') === true, 'cat is included in array pets');

// Expected output: false
console.assert(pets.includes('at') === false, 'at is not included in array pets');