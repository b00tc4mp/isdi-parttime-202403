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

google('hello world', function (results) {
    block(1)
    console.table(results)
})

block(3)

google('hola mundo', function (results) {
    block(0)
    console.log(results)

    document.body.innerHTML = ''

    var list = document.createElement('ul')

    results.forEach(function (results) {
        var item = document.createElement('li')
        var anchor = document.createElement('a')

        anchor.innerText = result.title
        anchor.href = result.link
        anchor.target = '_blank'

        item.appendChild(anchor)
        list.appendChild(item)
    })

    document.body.appendChild(list)
})


// https://www.google.com/search?q=isdi+coders

