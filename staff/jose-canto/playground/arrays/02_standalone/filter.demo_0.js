delete Array.prototype.filter // Elminamos el metodo filter para evitar usar el metodo.

// Recrear metodo filter

function filter(array, callback) {

  var filtered = [];

  for (var i = 0; i < array.length; i++) {
    var element = array[i]

    var matches = callback(element)

    if (matches) {
      //filtered[i] = element // Aqui no funcionaria, porque en los elementos que no hay nada al indice le añadiria un elemento con undefined.
      filtered[filtered.length] = element
    }
  }
  return filtered
}

console.info(" -- CASE filters words with length greater than 6 --");

var words = ["spray", "elite", "exuberant", "destruction", "present"]
var result = filter(words, function (word) { return word.length > 6 })

console.debug(result)
// output: [ 'exuberant', 'destruction', 'present' ]

//! TEST ASSERT

console.assert(result[0] === "exuberant", "filter words length > 6  is exuberant")
console.assert(result[1] === "destruction", "filter words length > 6 at index 1 is destruction")
console.assert(result[2] === "present", "filter words length > 6 at index 2 is present")
console.assert(result.length === 3, "result length is 3")

//? ----------------------------------------------------------------------

console.info(" -- CASE filter products with price between min and max --")

var shop = [
  {
    brand: "Apple",
    model: "MackBook Pro M2",
    kind: "computer",
    year: 2023,
    price: 2500
  },
  {
    brand: "Apple",
    model: "MacBook Air",
    kind: "computer",
    year: 2023,
    price: 900
  },
  {
    brand: "Apple",
    model: "Iphone 15 Pro Max",
    kind: "smartphone",
    year: 2023,
    price: 1200
  },
  {
    brand: "Asus",
    model: "Aspire",
    kind: "computer",
    year: 2024,
    price: 600
  },
  {
    brand: "Apple",
    model: "Air pods",
    kind: "headphones",
    year: 2024,
    price: 200
  },
  {
    brand: "Dell",
    model: "Cool Dellirius",
    kind: "computer",
    year: 2024,
    price: 550
  }
]

var products = filter(shop, function (product) {
  return product.price >= 500 && product.price <= 1000 && product.kind === "computer";
})

console.table(products)
/*
┌─────────┬─────────┬──────────────────┬────────────┬──────┬───────┐
│ (index) │ brand   │ model            │ kind       │ year │ price │
├─────────┼─────────┼──────────────────┼────────────┼──────┼───────┤
│ 0       │ 'Apple' │ 'MacBook Air'    │ 'computer' │ 2023 │ 900   │
│ 1       │ 'Asus'  │ 'Aspire'         │ 'computer' │ 2024 │ 600   │
│ 2       │ 'Dell'  │ 'Cool Dellirius' │ 'computer' │ 2024 │ 550   │
└─────────┴─────────┴──────────────────┴────────────┴──────┴───────┘
*/

//! TEST ASSERT

console.assert(products[0].brand === "Apple", "Brand is Apple")
console.assert(products[0].model === "MacBook Air", "Model is MacBook Air")
console.assert(products[0].kind === "computer", "Kind is computer")
console.assert(products[0].year === 2023, "Year is 2023")
console.assert(products[0].price === 900, "Price is 900")
console.assert(products.length === 3, "Products length is not 3");


