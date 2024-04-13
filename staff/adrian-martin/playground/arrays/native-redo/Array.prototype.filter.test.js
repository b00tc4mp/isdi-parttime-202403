delete Array.prototype.filter

Array.prototype.filter = function(callback) {
  var filtered = []

  for(var i = 0; i < this.length;i++){
      var element = this[i]

      var matches = callback(element, i, this)

      if(matches)
          filtered[filtered.length] = element

  }

  return filtered
}



console.info('CASE filters words with length greater than 6')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter(function(word) { return word.length > 6} );

console.debug(result);

//[ 'exuberant', 'destruction', 'present' ]

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


var products = shop.filter(function(product){
    return product.price >= 500 && product.price <= 1000 && product.kind === 'computer'
})

console.debug(products)
console.table(products)
/*
{
    brand: 'Asus',
    model: 'Aspire',
    kind: 'computer',
    year: 2024,
    price: 600
  },
  {
    brand: 'Dell',
    model: 'Cool Dellirius 2',
    kind: 'computer',
    year: 2024,
    price: 900
  }
]
┌─────────┬────────┬────────────────────┬────────────┬──────┬───────┐
│ (index) │ brand  │ model              │ kind       │ year │ price │
├─────────┼────────┼────────────────────┼────────────┼──────┼───────┤
│ 0       │ 'Asus' │ 'Aspire'           │ 'computer' │ 2024 │ 600   │
│ 1       │ 'Dell' │ 'Cool Dellirius 2' │ 'computer' │ 2024 │ 900   │
*/
console.info('CASE filter animals with other argumnets and group them in objects')

var animals = ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
var data = []

var result = animals.filter(function(animal, index, animals) {
    var matches = animal.includes('e')

    if(matches)
    data[data.length] = {animal: animal, index: index, animals: animals}

    return matches
})

console.debug(result)

console.debug(data)
console.table(data)
/*
[ 'elephant', 'chimpanzee' ]
[
  {
    animal: 'elephant',
    index: 0,
    animals: [ 'elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla' ]
  },
  {
    animal: 'chimpanzee',
    index: 3,
    animals: [ 'elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla' ]
  }
]
┌─────────┬──────────────┬───────┬───────────────────────────────────────────────────────┐
│ (index) │ animal       │ index │ animals                                               │
├─────────┼──────────────┼───────┼───────────────────────────────────────────────────────┤
│ 0       │ 'elephant'   │ 0     │ [ 'elephant', 'koala', 'kangoroo', ... 2 more items ] │
│ 1       │ 'chimpanzee' │ 3     │ [ 'elephant', 'koala', 'kangoroo', ... 2 more items ] │
└─────────┴──────────────┴───────┴───────────────────────────────────────────────────────┘
*/