import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../../data/index.js'

import addStudent from './addStudent.js'
import { ContentError, DuplicityError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('addStudent', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => User.deleteMany())


    it('succeds on adding a student', () => {
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash, userType: 'teacher' })
                .then(user => User.create({ name: 'Wind', surname: 'Book', email: 'wind@book.com', username: 'windbook', password: hash, userType: 'teacher' })
                    .then(student => addStudent(user.id, student.id)
                        .then(() => User.findById(user.id))
                        .then(newUser => {
                            expect(newUser.student).to.include(student.id)
                        }))))
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Wind', surname: 'Book', email: 'wind@book.com', username: 'windbook', password: hash, userType: 'teacher' }))
            .then(student => addStudent(new ObjectId().toString(), student.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing student', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Wind', surname: 'Book', email: 'wind@book.com', username: 'windbook', password: hash, userType: 'teacher' }))
            .then(user => addStudent(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('student not found')
            })
    })

    it('fails on existing student', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash, userType: 'teacher' })
                .then(user => User.create({ name: 'Wind', surname: 'Book', email: 'wind@book.com', username: 'windbook', password: hash, userType: 'teacher' })
                    .then(student => addStudent(user.id, student.id)
                        .then(() => User.findById(user.id)
                            .then(() => addStudent(user.id, student.id))))))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('student already exists for this user')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            addStudent(123, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid studentId', () => {
        let errorThrown
        try {
            addStudent(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('studentId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})