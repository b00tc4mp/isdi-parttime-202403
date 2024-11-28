(function loop(count) {
    if (count > 3)
        return

    console.log(count)

    loop(count + 1)
})(0)


// VM644:5 0
// VM644:5 1
// VM644:5 2
// VM644:5 3

// no prob if enclosing 0 in many parenthesis

//     (function loop(count) {
//         if (count > 3)
//             return

//         console.log(count)

//         loop(count + 1)
//     })(((0)))


// // VM706:5 0
// // VM706:5 1
// // VM706:5 2
// // VM706:5 3