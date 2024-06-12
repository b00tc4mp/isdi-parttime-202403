import { useState, useEffect } from 'react'

import View from '../library/View'

import Header from '../Views/components/Header'
import PostList from '../Views/components/PostList'

import Button from '../core/Button'
import Heading from '../core/Heading'
import PrincipalBar from '../core/PrincipalBar'
// import Footer from '../core/Footer'

import logic from '../../logic'

function Home({ onUserLoggedOut }) {
  const [name, setName] = useState('')

  const handleLogout = () => {
    logic.logoutUser()

    onUserLoggedOut()
  }

  useEffect(() => {
    try {
      logic.getUserName((error, name) => {
        if (error) {

          alert(error.message)

          return
        }

        setName(name)

      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }, [])

  return <View>
    <PrincipalBar name={name} onClick={handleLogout} children={"Logout"}></PrincipalBar>

    <View tag="main">
      <PostList />
    </View>

    {/* <Footer></Footer> */}
  </View>
}

export default Home