import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import getTeachers from './getTeachers.js'
import { User } from '../../data/index.js'
import { expect } from 'chai'
import addStudent from './addStudent.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('getTeachers', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeds on getting students', () =>
        bcrypt.hash('12345678', 8)
            .then(hash => Promise.all([User.create({
                name: 'Mocha',
                surname: 'Chai',
                email: 'Mocha@Chai.com',
                username: 'MochaChai',
                password: hash,
                userType: 'teacher'
            }), User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            }),
            User.create({
                name: 'Test2',
                surname: 'User2',
                email: 'test2@user.com',
                username: 'testuser2',
                password: hash,
                userType: 'student'
            })]))
            .then(([teacher1, teacher2, student]) => addStudent(teacher1.id, student.id)
                .then(() => addStudent(teacher2.id, student.id)
                    .then(() => User.findById(student.id)
                        .then(user => getTeachers(user.id))))
                .then(listTeachers => {
                    expect(listTeachers).to.be.an('array')
                    expect(listTeachers).to.have.lengthOf(2)

                    const usernames = listTeachers.map(teacher => teacher.username)

                    expect(usernames).to.include('MochaChai')
                    expect(usernames).to.include('testuser')
                })))


    it('fails on non-existing user', () => {
        let errorThrown

        getTeachers(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getTeachers(1234567890)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})