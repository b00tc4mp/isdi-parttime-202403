function doThat() {
    setTimeout(() => { throw new Error('hello error') }, 0)
}


try {
    doThat()
} catch (error) {
    console.error('ERROR', error)
}
// undefined
// VM211: 2 Uncaught Error: hello error
// at < anonymous >: 2: 30
//     (anonymous) @VM211: 2
// setTimeout(async)
// doThat @VM211: 2
//     (anonymous) @VM211: 7