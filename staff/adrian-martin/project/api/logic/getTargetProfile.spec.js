import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { User } from "../data/index.js"
import { NotFoundError, ContentError } from "com/errors.js"
import { expect } from "chai"
import getTargetProfile from "./getTargetProfile.js"

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('getTargetProfile', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () => {
        let userId

        return bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => {
                userId = user._id

                return User.findById(userId).lean()
            })
            .then(user => {
                expect(user).to.be.an('object')
                expect(user).to.have.property('name', 'Mocha')
                expect(user).to.have.property('username', 'MochaChai')
                expect(user).to.have.property('email', 'Mocha@Chai.com')
                expect(user.password).to.not.equal('123132123')
            })
    })

    it('fails on non-existing user', () => {
        const invalidUserId = new ObjectId().toString()
        const targetProfileId = new ObjectId().toString()

        return getTargetProfile(invalidUserId, targetProfileId)
            .then(() => {
                throw new Error('Expected NotFoundError but got success')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('fails if target profile does not exist', () => {
        let userId

        return bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => {
                userId = user._id

                return getTargetProfile(userId, new ObjectId().toString())
            })
            .then(() => {
                throw new Error('Expected NotFoundError but got success')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Target profile not found')
            })
    })

    it('fails if target dont match', () => {
        let userId, otherUserId

        return bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => {
                userId = user._id
                return bcrypt.hash('456456456', 8)
            })
            .then(hash => User.create({ name: 'Latte', username: 'LatteChai', email: 'Latte@Chai.com', password: hash }))
            .then(otherUser => {
                otherUserId = otherUser._id

                return getTargetProfile(userId.toString(), otherUserId.toString())
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Target profile not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getTargetProfile('invalid_user_id', new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid targetProfileId', () => {
        let errorThrown

        try {
            getTargetProfile(new ObjectId().toString(), 'invalid_target_profile_id')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('targetProfile is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})