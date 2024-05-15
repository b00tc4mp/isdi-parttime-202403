function loop(count) {
    if (count > 3)
        return

    console.log(count)

    loop(count + 1)
}

loop(0)


    //  0
    //  1
    //  2
    //  3
    /////////////////
    (function loop(count) {
        if (count > 3)
            return

        console.log(count)

        loop(count + 1)
    })(0)


    // 0
    // 1
    // 2
    // 3

    //////////////////////////////////////

    //debugger

    (function loop(count) {
        console.log('loop', 'start', count)

        if (count < 3) {
            console.log('print', count)

            console.log('loop', count, 'call loop', count + 1, 'and wait')
            loop(count + 1)
        }

        console.log('loop', 'end', count)

        if (count === 0)
            return function (message) { console.log(message) }
    })(0)('end loop')

//esto es lo q sale con el debugger
// loop start 0
// print 0
// loop 0 call loop 1 and wait
// loop start 1
// print 1
// loop 1 call loop 2 and wait
// loop start 2
// print 2
// loop 2 call loop 3 and wait
// loop start 3
// loop end 3
// loop end 2
// loop end 1
// loop end 0
// end loop
// undefined