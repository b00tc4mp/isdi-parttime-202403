function forEach(array, callback){
    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        callback(element, i, array);
    }
}

console.info('CASE print chars to uppercase in console');

var chars = ['a', 'b', 'c'];

forEach(chars, function (element) {
    console.log(element.toLocaleUpperCase());
    // Expected output: "A"
    // Expected output: "B"
    // Expected output: "C"
});

console.info('CASE create objects witch each iteration arguments');

var animals = ['dog', 'cat', 'horse'];
var animalsInfo = [];

forEach(animals, function(animal, index, animals) {
    var object = { animal: animal, index: index, animals: animals };
    animalsInfo[animalsInfo.length] = object;
})