new Promise((resolve, reject) => {
    setTimeout(() => {
        var result
        // complex thing...
        result = 1
        // complex thing...
        //resolve(result)
        reject(new Error('mal la cosa 1'))
    }, 2000)
})
    .then(res => console.log('happy', res))
    .catch(error => console.error('unhappy', error))
    .then(() => setTimeout(() => console.log('happy', 2), 3000))
    .then(() => {
        console.log('happy', 3)

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var result
                // complex thing...
                result = 4
                // complex thing...
                resolve(result)
                //reject(new Error('mal la cosa'))
            }, 1000)
        })
            .then(res => {
                console.log('happy', res)

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        var result
                        // complex thing...
                        result = 5
                        // complex thing...
                        //resolve(result)
                        reject(new Error('mal la cosa 2'))
                    }, 2000)
                })
            })
    })
    .catch(error => {
        console.error('unhappy', error)

        throw new Error('mal la cosa 3')
    })
    .then(res => {
        console.log('happy', res)

        return 6
    })
    .catch(error => {
        console.error('unhappy', error)

        return 7
    })
    .then(res => {
        console.log('happy', res)
    })

console.log('hola mundo')
// VM894:61 hola mundo
// undefined
// VM894:12 unhappy Error: mal la cosa 1
//     at <anonymous>:8:16
// overrideMethod @ console.js:288
// (anonymous) @ VM894:12
// Promise.catch (async)
// (anonymous) @ VM894:12
// Show 1 more frame
// Show less
// VM894:15 happy 3
// VM894:28 happy 4
// VM894:13 happy 2
// VM894:43 unhappy Error: mal la cosa 2
//     at <anonymous>:37:32
// overrideMethod @ console.js:288
// (anonymous) @ VM894:43
// Promise.catch (async)
// (anonymous) @ VM894:42
// Show 1 more frame
// Show less
// VM894:53 unhappy Error: mal la cosa 3
//     at <anonymous>:45:15
// overrideMethod @ console.js:288
// (anonymous) @ VM894:53
// Promise.catch (async)
// (anonymous) @ VM894:52
// Show 1 more frame
// Show less
// VM894:58 happy 7