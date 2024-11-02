import data from './index.js'

data.insertPost({
    author: 'jameshook',
    title: 'smile 2',
    image: 'https://m.media-amazon.com/images/I/41xsPjrM-pL._AC_UF350,350_QL50_.jpg', description: 'hi 2',
    date: new Date().toISOString()
}, error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post inserted')
})
