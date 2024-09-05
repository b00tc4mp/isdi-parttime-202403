function block(millis) {
    console.log('block start', new Date().toISOString())

    var before = Date.now()

    while (Date.now() - before < millis);

    console.log('block end', new Date().toISOString())
}

block(10000)

// console.log('continue...')
// VM1734: 2 block start 2024-04 - 18T18: 45: 28.972Z
// VM1734: 8 block end 2024-04 - 18T18: 45: 38.972Z
// VM1734: 13 continue...