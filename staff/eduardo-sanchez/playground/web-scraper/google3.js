function google(query) {
    var xhr = new XMLHttpRequest

    xhr.addEventListener('load', function () {
        //console.log(xhr.response)

        var parser = new DOMParser

        var doc = parser.parseFromString(xhr.response, 'text/html')

        var results = doc.querySelectorAll('.MjjYud')

        var data = []

        for (var i = 0; i < results.length; i++) {
            var result = results[i]

            var anchor = result.querySelector('a')

            if (anchor) {
                var url = anchor.href

                var heading3 = anchor.querySelector('h3')

                if (heading3) {
                    var title = heading3.innerText

                    data.push({ title: title, link: url })
                }
            }
        }

        console.table(data)
    })

    xhr.open('GET', `https://www.google.com/search?q=${query}`)

    xhr.send()
}

google('hello world')

console.log('...')

// google('gifs')

// console.log('.....')

/* en la consola de chrome puedes escribir esto cuando estas en la pagina de google.com:

setTimeout(function() { console.log('hola mundo') }, 1000)

console.log('.....')

*/