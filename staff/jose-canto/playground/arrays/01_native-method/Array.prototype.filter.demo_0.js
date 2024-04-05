//Ejemplo Usando Metodo array filter

console.info(" -- CASE filters words with length greater than 6 --");

var words = ["spray", "elite", "exuberant", "destruction", "present"]

var result = words.filter(function (word) { return word.length > 6 })

console.debug(result)
// Expected output: [ 'exuberant', 'destruction', 'present' ]

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
  },
]

var products = shop.filter(function (product) {
  return product.price >= 500 && product.price <= 1000 && product.kind === "computer";
})

console.debug(products)