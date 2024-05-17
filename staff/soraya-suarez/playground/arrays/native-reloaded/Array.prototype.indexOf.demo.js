delete Array.prototype.indexOf;

Array.prototype.indexOf = function (element, fromIndex) {
    if ((fromIndex > 0 && fromIndex >= this.length) || (fromIndex < 0 && fromIndex * -1 > this.length)) {
        return -1;
    } else {
        if (fromIndex < 0) {
            fromIndex += this.length;
        } else if (fromIndex === undefined) {
            fromIndex = 0;
        }
        for (let i = fromIndex; i < this.length; i++) {
            if (this[i] === element) {
                return i;
            }
        }
        return -1;
    }
}

var array = [2, 9, 9];

// Expected output: 0
console.assert(array.indexOf(2) === 0, '2 is in the index 0 of the array');

// Expected output: -1
console.assert(array.indexOf(7) === -1, '7 is not in the array');

// Expected output: -1
console.assert(array.indexOf(2, -5) === -1, '2 is not in the array if the search starts at index -5');

// Expected output: 2
console.assert(array.indexOf(9, 2) === 2, '9 is in the index 2 of the array if the search starts at index 2');

// Expected output: -1
console.assert(array.indexOf(2, -1) === -1, '2 is not in the array if the search starts at index -1');

// Expected output: 0
console.assert(array.indexOf(2, -3) === 0, '2 is in the index 0 of the array if the search starts at index -3');