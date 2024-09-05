import logic from './index.js'

try {
    logic.authenticateUser('peterpan', '123123123', error => {
    // logic.authenticateUser('dana', 'Hola1234', error => {
        if (error) {
            console.error(error)

            return
        }

        console.log('user authenticated')
    })
} catch (error) {
    console.error(error)
} 

/*
[
    {
        "name": "Pepito",
        "surname": "Grillo",
        "email": "pepito@grillo.com",
        "username": "pepitogrillo",
        "password": "123123123"
    },
    {
        "name": "Peter",
        "surname": "Pan",
        "email": "peter@pan.com",
        "username": "peterpan",
        "password": "123123123"
    },
    {
        "name": "Wendy",
        "surname": "Darling",
        "email": "wendy@darling.com",
        "username": "WendyD",
        "password": "Hola1234"
    },
    {
        "name": "manolo",
        "surname": "cabezabolo",
        "email": "manolo@cabezabolo.com",
        "username": "ManoloC",
        "password": "Hola1234"
    },
    {
        "name": "Pablo",
        "surname": "Picasso",
        "email": "pablo@picasso.com",
        "username": "PabloP",
        "password": "Hola1234"
    },
    {
        "name": "Man",
        "surname": "Zana",
        "email": "man@zana.com",
        "username": "manzana",
        "password": "123123123"
    },
    {
        "name": "Da",
        "surname": "Na",
        "email": "da@na.com",
        "username": "dana",
        "password": "Hola1234"
    },
    {
        "name": "Ba",
        "surname": "Nana",
        "email": "ba@nana.com",
        "username": "banana",
        "password": "123123123"
    }
]
*/