import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User } from '../../data/index.js'
import removeTeacher from './removeTeacher.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types


describe('removeTeacher', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => User.deleteMany())

    it('succeeds on removing teacher', () =>
        bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'student'
            })
                .then(student => User.create({
                    name: 'Mocha',
                    surname: 'Chai',
                    email: 'Mocha@Chai.com',
                    username: 'MochaChai',
                    password: hash,
                    userType: 'teacher',
                    student: student.id
                })
                    .then(teacher => removeTeacher(student.id, teacher.id)
                        .then(() => User.findById(teacher.id)))))
            .then(teacherInfo => {
                expect(teacherInfo.student).to.be.an('array')
                expect(teacherInfo.student).to.have.lengthOf(0)
            })
    )

    it('fails on non-existing user', () => {

        bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(teacherInfo => removeTeacher(new ObjectId().toString(), teacherInfo.id))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('user not found')
                }))
    })

    it('fails on non-existing student', () => {

        bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(teacher => removeTeacher(teacher.id, new ObjectId().toString()))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('student is not in your list')
                }))
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            removeTeacher(12345, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid teacherId', () => {
        let errorThrown

        try {
            removeTeacher(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('teacherId is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})