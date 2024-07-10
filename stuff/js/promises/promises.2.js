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

p
    .then(res => console.log('happy', res))
    .catch(error => console.error('unhappy', error))

console.log('hola mundo')
// VM578:16 hola mundo
undefined
// VM578:13 happy 1