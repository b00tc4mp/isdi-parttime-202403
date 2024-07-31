import { Routes, Route, Link } from 'react-router-dom'


// import Text from '../components/core/Text'

import ViewBox from '../components/library/ViewBox'

import About from '../components/library/About'

function Home() {
    return <>

        <ViewBox className={'Home'}>
            {/* <Text>WELLCOME TO HOME</Text> */}
            <Link to='/'>WELLCOME TO HOME</Link>
            <Link to='/login'>LogOut</Link>

            <Link to='/about'>About</Link>

            <Routes>
                <Route path='/about' element={<About />} />
            </Routes>

        </ViewBox>

    </>
}

export default Home