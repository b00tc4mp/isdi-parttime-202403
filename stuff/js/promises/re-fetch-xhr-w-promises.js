/*
fetch('https://b00tc4mp.com')
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(error => console.error(error))
*/

function refetch(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest

        xhr.addEventListener('load', () => {
            // 🤡?
            resolve({
                text() {
                    return new Promise(resolve => resolve(xhr.response))
                }
            })
        })

        xhr.addEventListener('error', () => {
            reject(new Error('connection error'))
        })

        xhr.open('GET', url)

        xhr.send()
    })
}

refetch('https://b00tc4mp.com')
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(error => console.error(error))