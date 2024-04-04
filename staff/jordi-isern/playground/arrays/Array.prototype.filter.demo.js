console.info('CASE filters words with length greater than 6')

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(function(word){ word.length > 6});

console.debug(result);
// Expected output: Array ["exuberant", "destruction", "present"]


console.info('CASE filter products with price between min and max')

var shop = [
    {
        band: 'Apple',
        model: 'mackbook pro',
        kind: 'computer',
        year: '2023',
        price: 2500
    },
    {
        brand: 'Apple',
        model: 'iphone15 pro Max',
        kind: 'smartphone',
        year: 2023,
        price:1200
    },
    {
        brand: ' Asus',
        moodel: 'Aspire',
        kind: 'computer',
        year:2024,
        print: 600
    },
    {
        brand:'Apple',
        model: 'Macbook Air',
        kind: 'computer',
        yead: '2024',
        price: 950
    }
]

var products = shop.filter(function(product){
    return product.price >= 500 && product.price <= º000 && 
})