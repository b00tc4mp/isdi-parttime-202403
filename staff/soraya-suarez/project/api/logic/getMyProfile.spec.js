import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import getMyProfile from './getMyProfile.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getMyProfile', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on get profile user', () =>
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
            }))
            .then((user) => getMyProfile(user.id))
                .then(userObtained => {
                    expect(userObtained._id).to.be.instanceOf(ObjectId)
                    expect(userObtained.name).to.equal('Soraya')
                    expect(userObtained.surname).to.equal('Suarez')
                    expect(userObtained.email).to.equal('soraya@suarez.com')
                    expect(userObtained.phone).to.equal('')
                    expect(userObtained.avatar).to.equal('')
                    expect(userObtained.role).to.equal('admin')
                    expect(userObtained.manager).instanceOf(ObjectId)
                    expect(userObtained.available).to.equal(true)
                    return bcrypt.compare('123123123', userObtained.password)
                })
                .then((match) => {
                    expect(match).to.be.true
                })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getMyProfile(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            getMyProfile(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})