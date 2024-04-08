//CASO filtra palabras con longitud mayor a 6

function filter(array, callback) {
    var filtered = []
    for(var i = 0; i < array.length; i++) {
        var element = array[i]

        var matches = callback(element)

        if(matches)
           filtered[filtered.length] = element  //hacer un push sin usar un push
    }
    return filtered
}

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = filter(words, function (word) { return word.length > 6 })

console.debug(result)

//CASO filtrar productos con precio entre mínimo y máximo

function filter(array, callback) {
    var filtered = []
    for(var i = 0; i < array.length; i++) {
        var element = array[i]

        var matches = callback(element)

        if(matches)
           filtered[filtered.length] = element  //hacer un push sin usar un push
    }
    return filtered
}

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

var products = filter(shop, function (product) {
    return product.price >= 500 && product.price <= 1000 && product.kind === 'computer'
})


console.debug(products)


//CASO animales con otros argumentos y agruparlos en objetos

function filter(array, callback) {
    var filtered = []
    for(var i = 0; i < array.length; i++) {
        var element = array[i]

        var matches = callback(element, i, array)

        if(matches)
           filtered[filtered.length] = element  //hacer un push sin usar un push
    }
    return filtered
}

var animals = ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
var data = []

var result = filter(animals, function (animal, index, animals) {
    var matches = animal.includes('e')

    if (matches)
        data[data.length] = { animal: animal, index: index, animals: animals }

    return matches
})

console.debug(result)
console.debug(data)