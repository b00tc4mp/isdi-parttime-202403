import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import deleteUser from './deleteUser.js'
import { NotFoundError, CredentialsError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deleteUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())
    
    it('succeeds on delete user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'admin',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then(user =>
                bcrypt.hash('123123123', 8)
                    .then(hash => User.create({ 
                        name: 'Agustin', 
                        surname: 'Suarez', 
                        email: 'agustin@suarez.com', 
                        role: 'user',
                        manager: user.id,
                        password: hash 
                    })
                    .then(userToDelete => ({ user, userToDelete }))
                    )
            )
            .then(({ user, userToDelete }) => 
                deleteUser(user.id, userToDelete.id)
            )
            .then(userId => 
                User.findById(userId).then(deletedUser => {
                    expect(deletedUser).to.be.null
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'admin',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then((user) => deleteUser(new ObjectId().toString(), user.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing user to delete', () => {
        let errorThrown

        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'admin',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then((user) => deleteUser(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user to delete not found')
            })
    })
    
    it('fails on non-permiting role user to delete', () => {
        let errorThrown

        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'user',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then((user) => deleteUser(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('role not permited')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            deleteUser(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid user id to delete', () => {
        let errorThrown
        
        try {
            deleteUser(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})