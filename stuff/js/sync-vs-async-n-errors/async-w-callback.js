function doThat(callback) {
    setTimeout(() => callback(new Error('hello error')), 0)
}


try {
    doThat(error => {
        if (error) {
            console.error('ASYNC ERROR', error)
        }
    })
} catch (error) {
    console.error('ERROR', error)
}
// undefined
// VM247: 9 ASYNC ERROR Error: hello error
// at < anonymous >: 2: 31