console.info('CASE filters words with length greater than 6')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter(function(word) { return word.length > 6})

console.debug(result)

//ouput : [ 'exuberant', 'destruction', 'present' ]

console.info('CASE filter products with price between min and max')

var shop = [
    {
        brand:'Apple',
        model: 'McBook Pro M2',
        kind: 'computer',
        year: 2023,
        price: 25000
    },
    {
        brand:'Apple',
        model: 'MacBook Air',
        kind: 'computer',
        year: 2023,
        price: 950
    },
    {
        brand:'Apple',
        model: 'iPhone 15 Pro Max',
        kind: 'smartphone',
        year: 2023,
        price: 12000
    },
    {
        brand:'Asus',
        model: 'Aspire',
        kind: 'computer',
        year: 2024,
        price: 600
    },
    {
        brand:'Apple',
        model: 'Air Pods',
        kind: 'headphones',
        year: 2024,
        price: 200
    },
    {
        brand:'Dell',
        model: 'Cool Delirius',
        kind: 'computer',
        year: 2024,
        price: 400
    }
]

var result = shop.filter(function(product) {
    
    return product.price >= 500 && product.kind === 'computer'
    
})

console.debug(result)

/*CASE filter products with price between min and max
[
  {
    brand: 'Apple',
    model: 'McBook Pro M2',
    kind: 'computer',
    year: 2023,
    price: 25000
  },
  {
    brand: 'Apple',
    model: 'MacBook Air',
    kind: 'computer',
    year: 2023,
    price: 950
  },
  {
    brand: 'Asus',
    model: 'Aspire',
    kind: 'computer',
    year: 2024,
    price: 600
  }
]
*/