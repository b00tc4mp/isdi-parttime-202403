import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User } from '../../data/index.js'
import removeStudent from './removeStudent.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('removeStudent', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on removing student', () =>
        bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(studentInfo => User.create({
                    name: 'Mocha',
                    surname: 'Chai',
                    email: 'Mocha@Chai.com',
                    username: 'MochaChai',
                    password: hash,
                    userType: 'teacher',
                    student: studentInfo.id
                })
                    .then(teacher => removeStudent(teacher.id, studentInfo.id)
                        .then(() => User.findById(teacher.id)))))
            .then(teacherInfo => {
                expect(teacherInfo.student).to.be.an('array')
                expect(teacherInfo.student).to.have.lengthOf(0)
            })
    )

    it('fails on non-existing teacher', () => {
        let errorThrown
        bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(studentInfo => removeStudent(new ObjectId().toString(), studentInfo.id)))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing student', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(teacher => removeStudent(teacher.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('student is not in your list')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            removeStudent(12345, new ObjectId().toString())
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
            removeStudent(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('studentId is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})