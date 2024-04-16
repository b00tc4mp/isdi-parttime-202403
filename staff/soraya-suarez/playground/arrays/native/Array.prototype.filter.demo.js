console.info('CASE filters words with length greater than 6');

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = words.filter(function (word) { return word.length > 6 });

// Expected output: Array ["exuberant", "destruction", "present"]
console.assert(result[0] === 'exuberant', 'result 0 is exuberant');
console.assert(result[1] === 'destruction', 'result 1 is destruction');
console.assert(result[2] === 'present', 'result 2 is present');
console.assert(result.length === 3, 'result length is 3');

console.info('CASE filters products with size 38 and price less than 30');

var products = [
    {
        ref: '8228/035',
        model: 'JEANS Z1975 MINI FLARE TIRO ALTO',
        color: 'Azul medio',
        size: 38,
        price: 25.95
    },
    {
        ref: '8228/035',
        model: 'JEANS Z1975 MINI FLARE TIRO ALTO',
        color: 'Crudo',
        size: 38,
        price: 25.95
    },
    {
        ref: '6688/034',
        model: 'JEANS TRF WIDE LEG TIRO MEDIO FULL LENGTH',
        color: 'Azul',
        size: 42,
        price: 29.95
    },
    {
        ref: '6688/034',
        model: 'JEANS TRF WIDE LEG TIRO MEDIO FULL LENGTH',
        color: 'Azul',
        size: 44,
        price: 29.95
    },
    {
        ref: '6688/034',
        model: 'JEANS TRF WIDE LEG TIRO MEDIO FULL LENGTH',
        color: 'Azul',
        size: 36,
        price: 29.95
    },
    {
        ref: '2982/178',
        model: 'PANTALÓN PINZAS ZW COLLECTION',
        color: 'Crudo',
        size: 34,
        price: 39.95
    },
    {
        ref: '9632/076',
        model: 'JEANS ZW RECTOS TIRO MEDIO',
        color: 'Leopardo',
        size: 40,
        price: 49.95
    },
    {
        ref: '9632/076',
        model: 'PANTALÓN FLARE CANALÉ',
        color: 'Amarillo claro',
        size: 38,
        price: 19.95
    }
];

var garments = products.filter(function(garment) {
    return garment.size === 38 && garment.price < 30;
});

/*Expected output:
Array [
    {
        ref: '8228/035',
        model: 'JEANS Z1975 MINI FLARE TIRO ALTO',
        color: 'Azul medio',
        size: 38,
        price: 25.95
    },
    {
        ref: '8228/035',
        model: 'JEANS Z1975 MINI FLARE TIRO ALTO',
        color: 'Crudo',
        size: 38,
        price: 25.95
    },
    {
        ref: '9632/076',
        model: 'PANTALÓN FLARE CANALÉ',
        color: 'Amarillo claro',
        size: 38,
        price: 19.95
    }
];*/

console.assert(garments[0].ref === '8228/035', 'garments 0 ref is 8228/035');
console.assert(garments[0].model === 'JEANS Z1975 MINI FLARE TIRO ALTO', 'garments 0 model is JEANS Z1975 MINI FLARE TIRO ALTO');
console.assert(garments[0].color === 'Azul medio', 'garments 0 color is Azul medio');
console.assert(garments[0].size === 38, 'garments 0 size is 38');
console.assert(garments[0].price === 25.95, 'garments 0 price is 25.95');

console.assert(garments[1].ref === '8228/035', 'garments 1 ref is 8228/035');
console.assert(garments[1].model === 'JEANS Z1975 MINI FLARE TIRO ALTO', 'garments 1 model is JEANS Z1975 MINI FLARE TIRO ALTO');
console.assert(garments[1].color === 'Crudo', 'garments 1 color is Crudo');
console.assert(garments[1].size === 38, 'garments 1 size is 38');
console.assert(garments[1].price === 25.95, 'garments 1 price is 25.95');

console.assert(garments[2].ref === '9632/076', 'garments 1 ref is 9632/076');
console.assert(garments[2].model === 'PANTALÓN FLARE CANALÉ', 'garments 2 model is PANTALÓN FLARE CANALÉ');
console.assert(garments[2].color === 'Amarillo claro', 'garments 2 color is Amarillo claro');
console.assert(garments[2].size === 38, 'garments 2 size is 38');
console.assert(garments[2].price === 19.95, 'garments 2 price is 19.95');

console.assert(garments.length === 3, 'garments length is 5');