var array = [2, 9, 9];

// Expected output: 0
console.assert(array.indexOf(2) === 0, '2 is in the index 0 of the array');

// Expected output: -1
console.assert(array.indexOf(7) === -1, '7 is not in the array');

// Expected output: 2
console.assert(array.indexOf(9, 2) === 2, '9 is in the index 2 of the array if the search starts at index 2');

// Expected output: -1
console.assert(array.indexOf(2, -1) === -1, '2 is not in the array if the search starts at index -1');

// Expected output: 0
console.assert(array.indexOf(2, -3) === 0, '2 is in the index 0 of the array if the search starts at index -3');