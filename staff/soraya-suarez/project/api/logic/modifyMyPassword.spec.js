import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import modifyMyPassword from './modifyMyPassword.js'
import { NotFoundError, ContentError, CredentialsError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('modifyMyPassword', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on modify password of user', () =>
    bcrypt.hash('123123123', 8)
        .then(hash => User.create({ 
            name: 'Soraya', 
            surname: 'Suarez', 
            email: 'soraya@suarez.com',
            phone: '677856487',
            avatar: '',
            role: 'admin',
            manager: new ObjectId().toString(),
            available: true,
            password: hash 
        })
        .then(user =>
            modifyMyPassword(user.id, '123123123', '321321321', '321321321')
        ))
        .then(() => User.find())
        .then(users => {
            expect(users).to.be.an.instanceOf(Array)
            expect(users[0]).to.be.an.instanceOf(Object)
            expect(users[0].name).to.be.equal('Soraya')
            expect(users[0].surname).to.be.equal('Suarez')
            expect(users[0].email).to.be.equal('soraya@suarez.com')
            expect(users[0].phone).to.be.equal('677856487')
            expect(users[0].avatar).to.be.equal('')
            expect(users[0].role).to.be.equal('admin')
            expect(users[0].manager).to.be.a.string
            expect(users[0].available).to.be.equal(true)
            return bcrypt.compare('321321321', users[0].password)
        })
)

    it('fails on non-existing user', () => {
        let errorThrown

        return modifyMyPassword(new ObjectId().toString(), '123123123', '321321321', '321321321')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    /*it('fails on non-correct password of user', () => {
        let errorThrown

        bcrypt.hash('123123123', 8)
        .then(hash => User.create({ 
            name: 'Soraya', 
            surname: 'Suarez', 
            email: 'soraya@suarez.com',
            phone: '677856487',
            avatar: '',
            role: 'admin',
            manager: new ObjectId().toString(),
            available: true,
            password: hash 
        })
        .then(user => {
            return modifyMyPassword(user.id, '345345345', '321321321', '321321321')
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.instanceOf(CredentialsError)
                    expect(errorThrown.message).to.equal('wrong password')
                })
            }))
    })*/

    it('fails on non-correct password of user', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
          .then((hash) => User.create({
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
          .then((user) => modifyMyPassword(user.id, '345345345', '321321321', '321321321')))
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(CredentialsError)
            expect(errorThrown.message).to.equal('wrong password')
          })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            modifyMyPassword(1234, '123123123', '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown
        
        try {
            modifyMyPassword(new ObjectId().toString(), '123123123', 1234, '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    it('fails on not match passwords', () => {
        let errorThrown
        
        try {
            modifyMyPassword(new ObjectId().toString(), '123123123', '321321325', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('passwords don\'t match')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})