import { useEffect, useState } from "react"

import Button from "../../Components/Core/Button";
import Title from "../../Components/Core/Title";
import View from "../../Components/Library/View";
import Header from "./components/Header";
import Heading from "../../Components/Core/Heading";
import PostList from "./components/PostList";

function Home({onUserLoggedOut}) {
    console.log('home -> render')

    const [name,setName] = useState('')

    const handleLogout =() => {
        logic.logoutUsern()

        onUserLoggedOut()
    }

    useEffect(()=>{
        try{
            logic.getUserName((error, name) =>{
                if(error){
                    console.error(error)
                    alert(error.message)
                }
                setName(name)
            })

        }catch{
            console.error(error)

        alert(error.message)}
    },[])


    return <View>
        <Header>
            <Heading level='3'>{name}</Heading>
            <Button onClick={handleLogout}>logout</Button>
        </Header>


        <View tag='main'>
            <PostList/>
        </View>

        <footer></footer>
    </View>
}

export default Home