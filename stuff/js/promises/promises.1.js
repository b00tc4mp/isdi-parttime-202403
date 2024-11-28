var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        var result
        // complex thing...
        result = 1
        // complex thing...
        resolve(result)
        //reject(new Error('mal la cosa'))
    }, 5000)
})

p.then(res => console.log('happy', res), error => console.error('unhappy', error))

console.log('hola mundo')
// VM568: 14 hola mundo
undefined
// VM568: 12 happy 1