function google(query) {
    var xhr = new XMLHttpRequest

    //la atencion de la respuesta se prepara antes (callback, listener); 
    //en cuanto cargue la respuesta (ha habido respuesta del servidor) se ejecuta el callback y se pone en cola
    xhr.addEventListener("load", function () {

        //console.log(xhr.response)
        //parseamos lo que devuelve google
        var parser = new DOMParser
        var doc = parser.parseFromString(xhr.response, "text/html")
        var results = doc.querySelectorAll(".MjjYud")

        var data = []

        for (var i = 0; i < results.length; i++) {
            var result = results[i]

            var anchor = result.querySelector("a")

            if (anchor) {
                var url = anchor.href

                var heading3 = anchor.querySelector("h3")

                if (heading3) {
                    var title = heading3.innerText

                    data.push({ title: title, link: url })
                }
            }
        }

        console.table(data)

    })

    //le pasamos una direccion y con el GET se hace una peticion y se devuelve la info
    xhr.open("GET", `https://www.google.com/search?q=${query}`)

    // mandamos la peticion

    xhr.send()
}

google("hello world")

//CORS no permite conectarse al servidor desde una pagina que no sea desde google
