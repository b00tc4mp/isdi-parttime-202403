function* entries (array) {
    let index = 0;

    while (index < array.length) {
        yield { index: index, value: array[index] };
        index++;
    }
}


var array1 = ['a', 'b', 'c'];

var result = entries(array1)
console.log(result)
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())

var arrayLike = {
    length: 3,
    0: "a",
    1: "b",
    2: "c",
    3: "d", // ignored by entries() since length is 3
  };

var result = entries(arrayLike)
console.log(result)
console.log(result.next())
console.log(result.next())
console.log(result.next())
console.log(result.next())
