import 'dotenv/config'
import mongoose from 'mongoose'
import editGame from './editGame.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editGame(
                '66a9e33d6fc36f64e9967e22', '66b3b719b8eb5e9e171d90f9',
                {
                    title: 'Sekiro',
                    image: 'https://imgs.search.brave.com/OFkNK8rBLnP-oPCDeazsDCzRUwP3BDokUfbdLM4M_ao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMueHRyYWxpZmUu/Y29tL2NvbnZlcnNp/b25zL0VEOUMtVzRO/VzcxOTQ2LW1lZGl1/bV93NjQwX2g0ODBf/cTc1LXNla2lyby0w/Ny0xNTUwNzQ3MzAx/LndlYnA',
                    rating: 10,
                    hours: 140
                }
            )
                // editGame(
                //     '66a9e33d6fc36f64e9967e22', '66b3b719b8eb5e9e171d90f9',
                //     {
                //         title: 'SekiGod',
                //         image: '',
                //         rating: '',
                //         hours: ''
                //     }
                // )
                // editGame(
                //     '66a9e33d6fc36f64e9967e22', '66b3b719b8eb5e9e171d90f9',
                //     {
                //         title: '',
                //         image: '',
                //         rating: 9,
                //         hours: ''
                //     }
                // )
                // editGame(
                //     '66a9e33d6fc36f64e9967e22', '66b3b719b8eb5e9e171d90f9',
                //     {
                //         title: '',
                //         image: '',
                //         rating: '',
                //         hours: 10
                //     }
                // )
                .then(() => {
                    console.log("Game edited")
                })
                .catch((error) => console.error(error.message))

        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.error(error))