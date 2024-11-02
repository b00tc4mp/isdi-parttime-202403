function block(secs) {
    var before = Date.now()

    while (Date.now() - before < secs * 1000);
}

console.log('start', new Date().toISOString())

setTimeout(function () {
    console.log('hola mundo', new Date().toISOString())

    block(3)

    console.log('hello world', new Date().toISOString())
}, 10000)

block(5)

console.log('ciao mondo', new Date().toISOString())

setTimeout(function () {
    console.log('ola mundo', new Date().toISOString())

    block(4)

    console.log('salut monde', new Date().toISOString())
}, 1000)

block(2)

console.log('...', new Date().toISOString())

// VM1654:7 start 2024-05-15T19:03:56.771Z
// VM1654:19 ciao mondo 2024-05-15T19:04:01.771Z
// VM1654:31 ... 2024-05-15T19:04:03.771Z
// VM1654:22 ola mundo 2024-05-15T19:04:03.772Z
// VM1654:26 salut monde 2024-05-15T19:04:07.772Z
// VM1654:10 hola mundo 2024-05-15T19:04:07.773Z
// VM1654:14 hello world 2024-05-15T19:04:10.773Z