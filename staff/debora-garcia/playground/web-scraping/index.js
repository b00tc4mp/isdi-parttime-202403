var xhr = new XMLHttpRequest

//la atencion de la respuesta se prepara antes (callback, listener); 
//en cuanto cargue la respuesta (ha habido respuesta del servidor) se ejecuta el callback y se pone en cola
xhr.addEventListener("load", function () {
    // documento html que devuelve google
    console.log(xhr.response)

})

//le pasamos una direccion y con el GET se hace una peticion y se devuelve la info
xhr.open("GET", "https://www.google.com/search?q=hello+world")

// mandamos la peticion

xhr.send()