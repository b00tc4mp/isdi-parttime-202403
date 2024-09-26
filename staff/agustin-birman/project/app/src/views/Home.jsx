import { useState, useEffect } from 'react'

import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom'

import View from '../components/library/View'
import Header from '../components/library/Header'
import Button from '../components/core/Button'
import Heading from '../components/core/Heading'
import logic from '../logic'
import SelectActivity from './components/SelectActivity'
import MenuItem from './components/MenuItems'
import CompleteSentenceInfo from './components/CompleteSentenceInfo'
import CompleteSentence from './components/CompleteSentence'
import CreateActivity from './components/CreateActivity'
import ListActivities from './components/ListActivities'
import ViewActivity from './components/ViewActivity'
import ListExercises from './components/ListExercises'
import DoActivity from './components/DoActivity'
import ShowExerciseResults from './components/ShowExerciseResults'
import ShareQR from './components/ShareQR'
import AddStudent from './components/AddStudent'
import ListStudents from './components/ListStudents'
import ListTeachersActivities from './components/ListTeachersActivities'
import ListTeachers from './components/ListTeachers'
import OrderSentence from './components/OrderSentence'
import DoActivityOrderSentence from './components/DoActivityOrderSentence'
import ViewStudentStats from './components/ViewStudentStats'
import Vocabulary from './components/Vocabulary'
import DoActivityVocabulary from './components/DoActivityVocabulary'

function Home() {
    const [name, setName] = useState('')
    const navigate = useNavigate()

    const handleLogout = () => {
        logic.logoutUser()

        navigate('/login')
    }

    useEffect(() => {
        try {
            logic.getUserName()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [])

    return <View>
        <Header>
            <Heading level='3'><Link to='/'>{name}</Link></Heading>
            <Button onClick={handleLogout}>Logout</Button>
        </Header>

        <View tag='main'>
            <Routes>
                <Route path='/' element={<MenuItem></MenuItem>} />
                <Route path='/activities/select-type' element={<SelectActivity></SelectActivity>} />

                <Route path='/activities/create/:exerciseType' element={<CreateActivity></CreateActivity>} />

                <Route path='/activities/info-complete-sentence' element={<CompleteSentenceInfo></CompleteSentenceInfo>} />
                <Route path='/activities/:activityId/completeSentence' element={<CompleteSentence></CompleteSentence>} />
                <Route path='/activities/:activityId/orderSentence' element={<OrderSentence></OrderSentence>} />
                <Route path='/activities/:activityId/vocabulary' element={<Vocabulary></Vocabulary>} />

                <Route path='/activities/list' element={<ListActivities></ListActivities>} />
                <Route path='/activities/:userId/list' element={<ListTeachersActivities></ListTeachersActivities>} />

                <Route path='/activities/:activityId' element={<ViewActivity></ViewActivity>} />
                <Route path='/activities/:activityId/exercises' element={<ListExercises></ListExercises>} />

                <Route path='/activities/:activityId/do-activity/completeSentence' element={<DoActivity></DoActivity>} />
                <Route path='/activities/:activityId/do-activity/orderSentence' element={<DoActivityOrderSentence></DoActivityOrderSentence>} />
                <Route path='/activities/:activityId/do-activity/vocabulary' element={<DoActivityVocabulary></DoActivityVocabulary>} />
                <Route path='/activities/:activityId/results' element={<ShowExerciseResults></ShowExerciseResults>} />

                <Route path='/users/:userId' element={<ShareQR></ShareQR>} />
                <Route path='/users/:userInfoId/add' element={<AddStudent></AddStudent>} />
                <Route path='/users/students' element={<ListStudents></ListStudents>} />
                <Route path='/users/student/:userId/info' element={<ViewStudentStats></ViewStudentStats>} />
                <Route path='/users/teachers' element={<ListTeachers></ListTeachers>} />
            </Routes>
        </View>
    </View>
}


export default Home