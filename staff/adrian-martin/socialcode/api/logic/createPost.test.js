import 'dotenv/config'
import createPost from './createPost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPost('AdrianGon', 'smile4', 'https://imgs.search.brave.com/rY4vd7ChrTffot87xezWVyJZcsjp10UPNHx2EQMRCfs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiL2Qx/L2I2LzFiZDFiNjE1/ZTZkYTcwZGQ3MWRj/ODRmZDJmNDdjODBk/LmpwZw', 'hi 2', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts created')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))