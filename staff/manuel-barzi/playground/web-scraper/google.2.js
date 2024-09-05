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

xhr.open('GET', 'https://www.google.com/search?q=hello+world')

xhr.send()

