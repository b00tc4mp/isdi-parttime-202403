delete Array.prototype.join;

function join(array, separator) {
    var result = '';
    if (separator === undefined) {
        separator = ',';
    }
    if (array.length !== 0) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === undefined || array[i] === null) {
                result += i === array.length -1 ? '' : '' + separator;
            }else {
                if (Array.isArray(array[i])) {
                    result += i === array.length -1 ? join(array[i], separator) : join(array[i], separator) + separator;
                }else {
                    result += i === array.length -1 ? array[i].toString() : array[i].toString() + separator;
                }
            }
        }
    }
    return result;
}



var elements = ['Fire', 'Air', 'Water'];

console.assert(join(elements) === 'Fire,Air,Water', 'Returns string: Fire,Air,Water');
console.assert(join(elements, '') === 'FireAirWater', 'Returns string: FireAirWater');
console.assert(join(elements, '-') === 'Fire-Air-Water', 'Returns string: Fire-Air-Water');

var array = [];
console.assert(join(array) === '', 'Returns string: ');

var animals = ['Cow', null, 'dog', undefined];
console.assert(join(animals) === 'Cow,,dog,', 'Returns string: Cow,,dog,');

var numbers = [1,2,3];
console.assert(join(numbers, '-') === '1-2-3', 'Returns string: 1-2-3');

var numbers1 = [1, [2,3, [4,5]]];
console.assert(join(numbers1, '-') === '1-2-3-4-5', 'Returns string: 1-2-3-4-5');