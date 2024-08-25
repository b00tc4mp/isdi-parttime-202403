debugger

import 'dotenv/config'
import mongoose from 'mongoose'

import updateService from './updateService.js'

const { MONGODB_URL_TEST } = process.env

mongoose.connect(MONGODB_URL_TEST)
    .then(() => {
        try {
            updateService('66cb8d3d9e334b57ce1f9966', '66cb8d699e334b57ce1f9971', {
                name: 'Limpieza de cutis', description: 'Limpieza de cutis', category: 'Belleza', duration: 60, price: 50
            })
                .then((service) => console.log('service updated'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })