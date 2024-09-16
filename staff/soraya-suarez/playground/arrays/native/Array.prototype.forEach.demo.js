console.info('CASE print chars to uppercase in console');

var chars = ['a', 'b', 'c'];

chars.forEach(function (element) {
    console.log(element.toLocaleUpperCase());
    // Expected output: "A"
    // Expected output: "B"
    // Expected output: "C"
});

console.info('CASE create objects witch each iteration arguments');

var animals = ['dog', 'cat', 'horse'];
var animalsInfo = [];

animals.forEach(function(animal, index, animals) {
    var object = { animal: animal, index: index, animals: animals };
    animalsInfo[animalsInfo.length] = object;
})