import { useState } from "react"

import { useNavigate } from "react-router-dom"

import createAd from "../../../logic/createAd"


export function CreateAdForm() {

    const [data, setData] = useState('')

    const navigate = useNavigate()

    // const [data, setData] = useState({ title: '', description: '' })

    // const handleData = (event) => {

    //     if (data.title.length > 10) return

    //     setData({ ...data, [event.target.name]: event.target.value })
    //     console.log(data)
    // }

    const handleCreateAd = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const description = form.description.value
        const price = form.price.value

        console.log({ title, description, price })


        createAd(title, description, price)
            .then(() => {
                navigate("/")
                console.log('Ad created')

            })
            .catch(error => {
                console.error(error)
            })

        // try {
        //     createAd(title, description, price)
        //         .then(() => {
        //             navigate("/")
        //             console.log('Ad created')

        //         })
        //         .catch(error => {
        //             console.error(error)
        //         })
        // } catch (error) {
        //     console.error(error)
        // }
    }

    const handleCancelCreateAd = event => {
        event.preventDefault()
        navigate("/")
    }

    return <>

        <h1>CreateAdForm</h1>
        <form onSubmit={handleCreateAd}>
            <input id="title" type="text" placeholder="Title" />
            <input id="description" type="text" placeholder="Description" />
            <input id="price" type="text" placeholder="Price" />
            <p></p>
            <button>Create</button>
            <p></p>
            <button onClick={handleCancelCreateAd}>Cancel</button>
        </form>
    </>
}

{/* <h1>CreateAdForm</h1>
        <form>
            <input name="title" type="text" value={data.title} placeholder="Title" onChange={handleData} />
            <input name="description" type="text" value={data.description} placeholder="Description" onChange={handleData} />
        </form> */}

// const handleCancelCreateAd = (event, number) => {
//     event.preventDefault()
//     navigate("/")
//     number = number + 1

// }

// return <>

//     <h1>CreateAdForm</h1>
//     <form onSubmit={handleCreateAd}>
//         <input id="title" type="text" placeholder="Title" />
//         <input id="description" type="text" placeholder="Description" />
//         <input id="price" type="text" placeholder="Price" />

//         <button>Create</button>
//         <button onClick={(event) => handleCancelCreateAd(event, 5)}>Cancel</button>
//     </form>
// </>