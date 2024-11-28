var xhr = new XMLHttpRequest
/*
xhr.addEventListener('load', function() {
    console.log(xhr.status, xhr.response)
})
*/
xhr.onload = function () {
    console.log(xhr.status, xhr.response)
}

/*
xhr.addEventListener('error', function() {
    console.error('network error')
})
*/
xhr.onerror = function () {
    console.error('network error')
}


xhr.open('GET', 'https://www.googleasdfhasdhfñashdf8093248uqr813u9134u.com/search?q=holamundo')

xhr.send()