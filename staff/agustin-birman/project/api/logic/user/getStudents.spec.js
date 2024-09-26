import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import getStudents from './getStudents.js'
import { User } from '../../data/index.js'
import { expect } from 'chai'
import addStudent from './addStudent.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('getStudents', () => {
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
                userType: 'teacher'
            })]))
            .then(([teacher, student1, student2]) => addStudent(teacher.id, student1.id)
                .then(() => addStudent(teacher.id, student2.id)
                    .then(() => User.findById(teacher.id)
                        .then(user => getStudents(user.id))))
                .then(listStudents => {
                    expect(listStudents).to.be.an('array')
                    expect(listStudents).to.have.lengthOf(2)

                    const usernames = listStudents.map(student => student.username)

                    expect(usernames).to.include('testuser')
                    expect(usernames).to.include('testuser2')
                })))


    it('fails on non-existing user', () => {
        let errorThrown

        getStudents(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getStudents(1234567890)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})