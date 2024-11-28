//e = new TypeError('hello type error')

//e = new SyntaxError('wrong code')

e = new Error('hello error')

if (e instanceof TypeError)
    alert('oh, there was a problem with the type of data you entered')
else if (e instanceof SyntaxError)
    alert('oh, you did a wrong code')
else
    alert('oh, there was an unexpected problem')