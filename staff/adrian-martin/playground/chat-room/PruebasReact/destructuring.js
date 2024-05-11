{
    console.info('CASE destructuring v1')
    const o = {a: 1, b: 2}

    const a = o.a
    const b = o.b

    console.debug(a, b)
}
{
    console.info('CASE destructuring v2')
    const o = {a: 1, b: 2}

    const {a} = o
    const {b} = o

    console.debug(a, b)
}
{
    console.info('CASE destructuring v3')
    const o = {a: 1, b: 2}
    
    const {a, b} = o
    
    console.debug(a, b)
}
{
    console.info('CASE destructuring v4')
    const o = {a: 1, b: 2}
    
    const {a: A, b: B} = o
    
    console.debug(A, B)
}
{
    console.info('CASE destructuring v5')
    const n = [1, 2]

    const {0: a , 1: b} = n

    console.debug(a, b)
}
{
    console.info('CASE destructuring v6')
    const n = [1, 2]

    const [a, b] = n

    console.debug(a, b)
}
{
    console.info('CASE destructuring v7')
    const n = [1, 2]

    const [, b] = n

    console.debug(b)
}
{
    console.info('CASE destructuring v8')
    const n = [1, 2, 3, 4]

    const [, b,,] = n

    console.debug(b)
}
{
    console.info('CASE destructuring v9')
    var o = {
        a: 1,
        b: [
            2,
            [
                3,
                {
                    4: [
                        5,
                        {
                            hello: 'world'
                        },
                        6
                    ],
                    7: 'seven',
                    8: 'eight'
                },
                9
            ],
            10
        ],
        c: 11
    }

    const { b: [, [, {4: [, {hello: a}]}]] } = o

    console.debug('hello ' + a)
}
{
    console.info('CASE destructuring v10')
    var o = {
        a: 1,
        b: [
            2,
            [
                3,
                {
                    4: [
                        5,
                        {
                            hello: 'world'
                        },
                        6
                    ],
                    7: 'seven',
                    8: 'eight'
                },
                9
            ],
            10
        ],
        c: 11
    }

    const { b: [, [, {4: [, {hello}]}]] } = o

    console.debug('hello ' + hello)
}
{
    console.info('CASE destructuring v11')
    var o = {
        a: 1,
        b: [
            2,
            [
                3,
                {
                    4: [
                        5,
                        {
                            hello: 'world'
                        },
                        6
                    ],
                    7: 'seven',
                    8: 'eight'
                },
                9
            ],
            10
        ],
        c: 11
    } 
    const hello = o.b[1][1][4][1].hello

    console.debug('hello ' + hello)
}
