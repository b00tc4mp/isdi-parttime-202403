var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = words.filter(function (word) { return word.length > 6 })

console.debug(result)


//CASO filtrar productos con precio entre mínimo y máximo

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
        model: 'MacBook Air',
        kind: 'computer',
        year: 2023,
        price: 950
    },
    {
        brand: 'Apple',
        model: 'iPhone 15 Pro Max',
        kind: 'smatphone',
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
        kind: 'headphones',
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
        price: 550
    }
]

var products = shop.filter(function (product) {
    return product.price >= 500 && product.price <= 1000 && product.kind === 'computer'
})


console.debug(products)

//CASO animales con otros argumentos y agruparlos en objetos

var animals = ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
var data = []

var result = animals.filter(function (animal, index, animals) {
    var matches = animal.includes('e')

    if (matches)
        data[data.length] = { animal: animal, index: index, animals: animals }

    return matches
})

console.debug(result)
console.debug(data)