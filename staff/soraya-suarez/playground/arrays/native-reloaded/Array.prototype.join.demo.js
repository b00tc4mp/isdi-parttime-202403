delete Array.prototype.join;

Array.prototype.join = function (separator) {
    var result = '';
    if (separator === undefined) {
        separator = ',';
    }
    if (this.length !== 0) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === undefined || this[i] === null) {
                result += i === this.length -1 ? '' : '' + separator;
            }else {
                if (Array.isArray(this[i])) {
                    result += i === this.length -1 ? this[i].join(separator) : this[i].join(separator) + separator;
                }else {
                    result += i === this.length -1 ? this[i].toString() : this[i].toString() + separator;
                }
            }
        }
    }
    return result;
}



var elements = ['Fire', 'Air', 'Water'];

console.assert(elements.join() === 'Fire,Air,Water', 'Returns string: Fire,Air,Water');
console.assert(elements.join('') === 'FireAirWater', 'Returns string: FireAirWater');
console.assert(elements.join('-') === 'Fire-Air-Water', 'Returns string: Fire-Air-Water');

var array = [];
console.assert(array.join() === '', 'Returns string: ');

var animals = ['Cow', null, 'dog', undefined];
console.assert(animals.join() === 'Cow,,dog,', 'Returns string: Cow,,dog,');

var numbers = [1,2,3];
console.assert(numbers.join('-') === '1-2-3', 'Returns string: 1-2-3');

var numbers1 = [1, [2,3, [4,5]]];
console.assert(numbers1.join('-') === '1-2-3-4-5', 'Returns string: 1-2-3-4-5');