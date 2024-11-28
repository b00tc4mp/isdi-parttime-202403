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


// VM1013:4 loop start 0
// VM1013:7 print 0
// VM1013:9 loop 0 call loop 1 and wait
// VM1013:4 loop start 1
// VM1013:7 print 1
// VM1013:9 loop 1 call loop 2 and wait
// VM1013:4 loop start 2
// VM1013:7 print 2
// VM1013:9 loop 2 call loop 3 and wait
// VM1013:4 loop start 3
// VM1013:13 loop end 3
// VM1013:13 loop end 2
// VM1013:13 loop end 1
// VM1013:13 loop end 0
// VM1013:16 end loop
// undefined