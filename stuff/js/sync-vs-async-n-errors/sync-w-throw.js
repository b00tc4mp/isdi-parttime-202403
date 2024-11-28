function doThat() {
    throw new Error('hello error')
}


try {
    doThat()
} catch (error) {
    console.error('ERROR', error)
}
// VM192:9 ERROR Error: hello error
//     at doThat (<anonymous>:2:11)
//     at <anonymous>:7:5