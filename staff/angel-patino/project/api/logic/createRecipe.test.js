import 'dotenv/config'
import mongoose from 'mongoose'

import createRecipe from './createRecipe'

const { MONGODB_URL } = process.env

//author,title,thumbnail,cookTIme,ingredients,description
mongoose.connect(MONGODB_URL){
    .then(() => {
    try {
        createRecipe('Angel',)
    }
    })
}