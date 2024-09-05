// https://www.google.com/search?q=isdi+coders

var results = document.querySelectorAll('.MjjYud')

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