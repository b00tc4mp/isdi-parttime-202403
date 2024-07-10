/*
setTimeout(() => {
    console.log('hola mundo', new Date)

    setTimeout(() => {
        console.log('hello world', new Date)

        setTimeout(() => {
            console.log('ciao mondo', new Date)

            setTimeout(() => {
                console.log('privet mir', new Date)
        
                setTimeout(() => {
                    console.log('ola mundo', new Date)
                }, 3000)
            }, 3000)
        }, 3000)
    }, 3000)
}, 3000)
*/

function setTimeoutPromised(millis) {
    return new Promise(resolve => {
        setTimeout(resolve, millis)
    })
}

setTimeoutPromised(3000)
    .then(() => {
        console.log('hola mundo')

        return setTimeoutPromised(3000)
    })
    .then(() => {
        console.log('hello world')

        return setTimeoutPromised(3000)
    })
    .then(() => {
        console.log('ciao mondo')

        return setTimeoutPromised(3000)
    })
    .then(() => {
        console.log('privet mir')

        return setTimeoutPromised(3000)
    })
    .then(() => {
        console.log('ola mundo')

        return setTimeoutPromised(3000)
    })

console.log('continue...')
// VM1253: 56 continue...
// undefined
// VM1253: 31 hola mundo
// VM1253: 36 hello world
// VM1253: 41 ciao mondo
// VM1253: 46 privet mir
// VM1253: 51 ola mundo