var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter(function (word) {
    return word.length > 6 && word.includes("s")
});

console.debug(result);
// Expected output: Array ["exuberant", "destruction", "present"]

var shoppingList = [
    { name: "leche", quantity: 1, price: 3.00, kind: "lácteos" },
    { name: "huevos", quantity: 12, price: 8.00, kind: "lácteos" },
    { name: "pan", quantity: 2, price: 2.00, kind: "panadería" },
    { name: "manzanas", quantity: 6, price: 5.00, kind: "frutas" },
    { name: "zanahorias", quantity: 1, price: 10.00, kind: "verduras" }
];

var products = shoppingList.filter(function (product) {
    return product.price >= 7 && product.quantity <= 15
})

console.debug(products);

var animals = ['lion', 'tiger', 'turtle', 'monkey', 'eagle']
var data = []

var filteredAnimals = animals.filter(function (animal, index, animals) {

    var choosenAnimal = animal.startsWith("e") || animal.endsWith("e")

    if (choosenAnimal)

        data[data.length] = { animal: animal, index: index, animals: animals }

    return choosenAnimal
})

console.debug(filteredAnimals)
// ['', '']
console.debug(data)