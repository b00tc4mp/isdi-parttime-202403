function at(array, index) {
    if (index > 0) {
        return array[index];
    }else{
        return array[array.length+index];
    }
}

var array = [5, 12, 8, 130, 44];

var index = 2;

console.info('CASE return element with a  parameter index of array');

// Expected output: "An index of 2 returns 8"
console.assert(index === 2 && at(array, index) === 8, 'An index of 2 returns 8');

console.info('CASE return element with a parameter index of array');

index = -2;

// Expected output: "An index of -2 returns 130"
console.assert(index === -2 && at(array, index) === 130, 'An index of -2 returns 130');