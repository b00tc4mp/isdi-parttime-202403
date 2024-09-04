import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import modifyEmail from './modifyEmail.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('modifyEmail', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on modify email of user', () =>
    bcrypt.hash('123123123', 8)
        .then(hash => User.create({ 
            name: 'Soraya', 
            surname: 'Suarez', 
            email: 'soraya@suarez.com',
            phone: '',
            avatar: '',
            role: 'admin',
            manager: new ObjectId().toString(),
            available: true,
            password: hash 
        })
        .then(user =>
            modifyEmail(user.id, 'soraya@srz.com')
        ))
        .then(() => User.find())
        .then(users => {
            expect(users).to.be.an.instanceOf(Array)
            expect(users[0]).to.be.an.instanceOf(Object)
            expect(users[0].name).to.be.equal('Soraya')
            expect(users[0].surname).to.be.equal('Suarez')
            expect(users[0].email).to.be.equal('soraya@srz.com')
            expect(users[0].phone).to.be.equal('')
            expect(users[0].avatar).to.be.equal('')
            expect(users[0].role).to.be.equal('admin')
            expect(users[0].manager).to.be.a.string
            expect(users[0].available).to.be.equal(true)
            return bcrypt.compare('321321321', users[0].password)
        })
)

    it('fails on non-existing user', () => {
        let errorThrown

        return modifyEmail(new ObjectId().toString(), 'soraya@srz.com')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            modifyEmail(1234, 'soraya@srz.com')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown
        
        try {
            modifyEmail(new ObjectId().toString(), 'soraya')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})