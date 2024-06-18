import Button from "../components/core/Button"
//import Title from "../components/core/Title"
import { useState, useEffect } from "react" //** 
import View from "../components/library/View"
import Header from "./components/Header"
import logic from "../logic"
import Heading from "../components/core/Heading"
import PostList from "./components/PostList"
import Footer from "./components/Footer"
// se usa para manejar una situacion asincrona de recarca de react.
// hay que volver a repintar el compo para que se pinte el username, hay que llamar a la api 
// para que nos traiga un dato que es asincrono. 
// al setear el usuario va a tardar en cargar, para eso usamos un useEffect, de esta mamnera llamamos a la api
// useEffect es otro hook

function Home({ onUserLoggedOut }) {
    console.log("Home -> render")

    const [username, setUsername] = useState("")
    const [view, setView] = useState("")
    const [postListRefreshStamp, setpostListRefreshStamp] = useState(0) //*

    // estampa de tiempo inicialmente de 0
    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }

    useEffect(() => {
        console.log("Home -> useEffect")
        // setTimeout(() => {
        try {
            logic.getUsername((error, username) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                console.log("Home -> setUsername")

                setUsername(username)
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        // }, 10000)
    }, [])
    // se usa un array vacio para que solo se repinte cuando haya cambio de estado y no n veces

    const handleCreatePostClick = () => setView("create-post")

    const handleCancelCreatePostClick = () => setView("")

    const handleCreatePostSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const image = form.image.value
        const description = form.description.value

        try {
            logic.createPost(title, image, description, error => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setpostListRefreshStamp(Date.now())
                setView("")
            })

        } catch {
            console.error(error)

            alert(error.message)
        }
    }

    // stamp inicialmente es 0, cuando se hace el primer render, setstamp se actualizara a Date now
    // Post list recive esta prop, y en la dependencia de useEffect se detectara que dicha estamp ha cambiado de valor con lo que se volvera a pintar de nuevo
    // de esta manera el compo sabe que tiene que repintar los posts cuando se ha añadido un post nuevo

    return <View>
        <Header>
            <Heading level="3">{username}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag="main">
            <PostList refreshStamp={postListRefreshStamp} />
            
            {view === 'create-post' && <form className="Form FormWithFeedback CreatePostForm" onSubmit={handleCreatePostSubmit}>
                <div className="Field">
                    <label htmlFor="title">Title</label>
                    <input className="Input" id="title" type="text" placeholder="title" />
                </div>
                <div className="Field">
                    <label htmlFor="image">Image</label>
                    <input className="Input" id="image" type="text" placeholder="image" />
                </div>
                <div className="Field">
                    <label htmlFor="description">Description</label>
                    <input className="Input" id="description" type="text" placeholder="description" />
                </div>
                <button className="Button" type="button" onClick={handleCancelCreatePostClick}>Cancel</button>
                <button className="Button SubmitButton" type="submit">Create</button>
                <p className="Feedback">image is not valid, please, correct it</p>
            </form>}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
}

export default Home