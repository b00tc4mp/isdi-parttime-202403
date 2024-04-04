
delete Array.prototype.filter

function filter(array, callback){
    var newArray = [];

    for(var i = 0; i < array.length; i++){
        var element = array[i];

        var matches = callback(element, i , array);

        if(matches){
            newArray[newArray.length] = element
        }
    }
    return newArray;
}

//CASE filter words with a lenght greater that 6
var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = filter(words, function(word) { return word.length > 6 });

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

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
/*
[
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
    },
    {
        brand: 'Dell',
        model: 'Cool Dellirius 2',
        kind: 'computer',
        year: 2024,
        price: 550
    }
]
*/

//CASE filter animals with other arguments and group them in objects
var animals = ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
var newArray = []

var result = filter(animals, function (animal, index, animals) {
    var matches = animal.includes('e')

    if (matches){
        newArray[newArray.length] = { animal: animal, index: index, animals: animals }
    }

    return matches
})

console.debug(result)
// ['elephant', 'chimpanzee']
console.debug(newArray)
/*
[
    {
        animal: 'elephant',
        index: 0,
        animals: ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
    },
    {
        animal: 'chimpanzee',
        index: 3,
        animals: ['elephant', 'koala', 'kangoroo', 'chimpanzee', 'gorilla']
    }
]
*/