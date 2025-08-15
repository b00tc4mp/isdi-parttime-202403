import { useState, useEffect } from "react" //** 
import logic from "../logic"

import View from "../components/library/View"
import Header from "./components/Header"
import Heading from "../components/core/Heading"
import Button from "../components/core/Button"
import PostList from "./components/PostList"
import Footer from "./components/Footer"
import CreatePostForm from "./components/CreatePostForm"
// se usa para manejar una situacion asincrona de recarca de react.
// hay que volver a repintar el compo para que se pinte el username, hay que llamar a la api 
// para que nos traiga un dato que es asincrono. 
// al setear el usuario va a tardar en cargar, para eso usamos un useEffect, de esta mamnera llamamos a la api
// useEffect es otro hook

function Home({ onUserLoggedOut }) {
    console.log("Home -> render")

    const [username, setUsername] = useState("")
    const [view, setView] = useState("")
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)

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

    const handlePostCreated = () => {
        setPostListRefreshStamp(Date.now())

        setView("")
    }
    // stamp inicialmente es 0, cuando se hace el primer render, setstamp se actualizara a Date now
    // Post list recive esta prop, y en la dependencia de useEffect se detectara que dicha estamp ha cambiado de valor con lo que se volvera a pintar de nuevo
    // de esta manera el compo sabe que tiene que repintar los posts cuando se ha añadido un post nuevo
    // cuando creamos el CreatePost form, este recive dos parametros para que es home el que maneja la funcion de los botones
    return <View>
        <Header>
            <Heading level="3">{username}</Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag="main">
            <PostList refreshStamp={postListRefreshStamp} />

            {view === 'create-post' && <CreatePostForm onCancelCreatePostClick={handleCancelCreatePostClick} onPostCreated={handlePostCreated} />}
        </View>

        <Footer onCreatePostClick={handleCreatePostClick} />
    </View>
}

export default Home