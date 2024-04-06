delete Array.prototype.filter

Array.prototype.filter = function (callback) {
    var newArray = []; 

    for(var i = 0; i < this.length; i++) {
        if(callback(this[i], i, this)){
            newArray[newArray.length] = this[i];
        }
    }

    return newArray;
}

//filter words with a length greater than 6
var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter(function(word) { return word.length > 6 });

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

//another case 
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

console.log(products)

/* expected output
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

/* total log
[ 'exuberant', 'destruction', 'present' ]
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