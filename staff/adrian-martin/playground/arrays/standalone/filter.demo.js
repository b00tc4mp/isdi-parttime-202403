delete Array.prototype.filter

function filter(array, callback) {
    var filtered = []

    for(var i = 0; i < array.length;i++){
        var element = array[i]

        var matches = callback(element, i, array)

        if(matches)
            filtered[filtered.length] = element

    }

    return filtered
}

console.info('CASE filters words with length greater than 6')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = filter(words, function(word) { return word.length > 6} );

console.debug(result);

console.info('CASE filter products with price between min and max')

var shop = [
    {
        brand: 'Apple',
        model: 'MacBook Pro M2',
        kind: 'computer',
        year: 2023,
        price: 2500
    },
    {
        brand: 'Apple',
        model: 'iPhone 15 Pro Max',
        kind: 'smartphone',
        year: 2023,
        price: 1200
    },
    {
        brand: 'Asus',
        model: 'Aspire',
        kind: 'computer',
        year: 2024,
        price: 600
    },
    {
        brand: 'Apple',
        model: 'Air Pods',
        kind: 'headphone',
        year: 2024,
        price: 200
    },
    {
        brand: 'Dell',
        model: 'Cool Dellirius',
        kind: 'computer',
        year: 2024,
        price: 400
    },
    {
        brand: 'Dell',
        model: 'Cool Dellirius 2',
        kind: 'computer',
        year: 2024,
        price: 900
    }
]


var products = filter(shop, function(product){
    return product.price >= 500 && product.price <= 1000 && product.kind === 'computer'
})

console.debug(products)
console.table(products)

console.info('CASE filter animals with other argumnets and group them in objects')

var animals = ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
var data = []

var result = filter(animals, function(animal, index, animals) {
    var matches = animal.includes('e')

    if(matches)
    data[data.length] = {animal: animal, index: index, animals: animals}

    return matches
})

console.debug(result)

console.debug(data)
console.table(data)
