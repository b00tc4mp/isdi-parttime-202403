delete Array.prototype.filter


function filter(array, callback) {
    var filtered = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        var choosen = callback(element)

        if (choosen)
            filtered[filtered.length] = element
    }

    return filtered
}

console.info('CASE filters words with length greater than 6 and that includes the letter "s" ')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = filter(words, function (word) { return word.length > 6 && word.includes("s") })

console.debug(result)
// Expected output: Array ["exuberant", "destruction", "present"]

console.info('CASE filter products with price >= 7, quantity <=15, and kind === verduras')

var shoppingList = [
    { name: "leche", quantity: 1, price: 3.00, kind: "lácteos" },
    { name: "huevos", quantity: 12, price: 8.00, kind: "lácteos" },
    { name: "pan", quantity: 2, price: 2.00, kind: "panadería" },
    { name: "manzanas", quantity: 6, price: 5.00, kind: "frutas" },
    { name: "zanahorias", quantity: 1, price: 10.00, kind: "verduras" }
];

var products = filter(shoppingList, function (product) {
    return product.price >= 7 && product.quantity <= 15 && product.kind === "verduras"
})

console.debug(products)



console.info('CASE filter animals with other arguments and group them in objects')

var animals = ['lion', 'tiger', 'turtle', 'monkey', 'eagle']
var data = []

var filteredAnimals = filter(animals, function (animal, index, animals) {

    var choosenAnimal = animal.startsWith("e") || animal.endsWith("e")

    if (choosenAnimal)

        data[data.length] = { animal: animal, index: index, animals: animals }

    return choosenAnimal

})

console.debug(filteredAnimals)

console.log("--------------------------------------")

console.debug(data)