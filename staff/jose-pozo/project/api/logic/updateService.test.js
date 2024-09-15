import 'dotenv/config'
import mongoose from 'mongoose'

import updateService from './updateService.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateService('66cb8d3d9e334b57ce1f9966', '66cb9f97f06937d8e7c46669', {
                name: 'Limpieza de cutis', description: 'Limpieza de cutis', category: 'Belleza', duration: 60, price: 50
            })
                .then(() => console.log('service updated'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })