function loop(count) {
    if (count > 3)
        return

    console.log(count)

    loop(count + 1)
}

loop(0)


// VM601: 5 0
// VM601: 5 1
// VM601: 5 2
// VM601: 5 3