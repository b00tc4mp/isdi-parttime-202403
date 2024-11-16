function block(secs) {
  var before = Date.now()

  while (Date.now() - before < secs * 1000);
}

function google(query, callback) {
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

    callback(data)
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
  block(2)

  console.warn(results)
})

block(2)

google('privet mir', function (results) {
  block(3)

  document.body.innerHTML = ''

  var list = document.createElement('ul')

  results.forEach(function (result) {
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

console.log('...')

// VM1746:63 ...
// undefined
// VM1746:50
// (index)
// title
// link
// 0	'"Hello, World!" program'	'https://en.wikipedia.org/wiki/%22Hello,_World!%22_program'
// 1	'Hola mundo - Wikipedia, la enciclopedia libre'	'https://es.wikipedia.org/wiki/Hola_mundo'
// 2	'Hello World'	'https://code.org/helloworld'
// 3	'Hello, World!'	'https://www.helloworld-school.com/'
// 4	'Prime Video: Hello World'	'https://www.primevideo.com/detail/Hello-World/0Q3S7MDIZB78PEPPYE55CJNXRE'
// 5	'Total immersion, Serious fun! with Hello-World!'	'https://www.hello-world.com/'
// 6	'Hello World (2019)'	'https://www.imdb.com/title/tt9418812/'
// 7	'Hello World'	'https://www.raspberrypi.org/hello-world'
// 8	'Hello World'	'https://docs.github.com/en/get-started/start-your-journey/hello-world'
// Array(9)
// [Violation] 'load' handler took 1007ms
// VM1746:58
// (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

// on screen
// зарегистрироваться в Программе лояльности «Мир
// Привет!) - акции СБП и «Мир»
// Privet, mir!
// ericrkl/privet-mir: Привет мир
// Privet Mir
// Privet Mir
// Privet Mir
// Privet, mir!
// Privet mir (feat. Mainstream One)
// Mohammed Privet-mir