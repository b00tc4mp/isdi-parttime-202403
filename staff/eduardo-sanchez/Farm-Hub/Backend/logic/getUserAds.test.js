import 'dotenv/config'
import mongoose from 'mongoose'

import getUserAds from './getUserAds.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        // const userId = '66ae6370f11082ed7f0623dd'; // ID del usuario que estás probando  
        // const tokenUserId = '66ae6370f11082ed7f0623dd'; // ID del usuario del token (debe coincidir para la prueba)  

        try {
            getUserAds('66e4879730cb63f97bbc23e5')
                .then(ads => console.log(JSON.stringify(ads, null, 2)))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


////////////////////////

//cualquier user puede ver los anuncios de cualquier user mientras el token sea valido (se veran los anuncios del token user)

// import 'dotenv/config'
// import mongoose from 'mongoose'

// import getUserAds from './getUserAds.js'

// const { MONGODB_URL } = process.env

// mongoose.connect(MONGODB_URL)
//     .then(() => {

//         try {
//             getUserAds('66ae6370f11082ed7f0623dd')
//                 .then(ads => console.log(JSON.stringify(ads, null, 2)))
//                 .catch(error => console.error(error))
//         } catch (error) {
//             console.error(error)
//         }
//     })
//     .catch(error => console.error(error))


