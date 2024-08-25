import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import getAllGamesTargetUser from './getAllGamesTargetUser.js'
import { Game, User } from '../data/index.js'
import { expect } from 'chai'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('getAllGamesTargetUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Game.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Game.deleteMany(), User.deleteMany()]))

    it('succeeds when both user and targetUser exist and targetUser has games', () => {
        let userId, targetUserId

        // Create users and games
        return bcrypt.hash('123132123', 8)
            .then(hash => {
                return Promise.all([
                    User.create({ name: 'User1', username: 'user1', email: 'user1@example.com', password: hash }),
                    User.create({ name: 'TargetUser', username: 'targetuser', email: 'targetuser@example.com', password: hash })
                ])
            })
            .then(([user, targetUser]) => {
                userId = user._id
                targetUserId = targetUser._id

                // Create games for targetUser with all required fields
                return Game.create([
                    { title: 'Game1', hours: 5, rating: 4.5, image: 'image1.png', author: targetUserId },
                    { title: 'Game2', hours: 10, rating: 4.0, image: 'image2.png', author: targetUserId }
                ])
            })
            .then(() => {
                // Call the function
                return getAllGamesTargetUser(userId, targetUserId)
            })
            .then(games => {
                // Check the result
                expect(games).to.be.an('array').that.has.lengthOf(2)

                expect(games[0]).to.deep.include({
                    title: 'Game1',
                    hours: 5,
                    rating: 4.5,
                    image: 'image1.png'
                })

                expect(games[1]).to.deep.include({
                    title: 'Game2',
                    hours: 10,
                    rating: 4.0,
                    image: 'image2.png'
                })

                // Validate the format of the author field
                expect(games[0].author).to.deep.equal({ id: targetUserId.toString() })
                expect(games[1].author).to.deep.equal({ id: targetUserId.toString() })
            })
    })

    it('fails if user does not exist', () => {
        const invalidUserId = new ObjectId().toString()
        const validTargetUserId = new ObjectId().toString()

        return getAllGamesTargetUser(invalidUserId, validTargetUserId)
            .then(() => {
                throw new Error('Expected NotFoundError but got success')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('fails if user does not exist', () => {
        const invalidUserId = new ObjectId().toString()
        const validTargetUserId = new ObjectId().toString()

        return getAllGamesTargetUser(invalidUserId, validTargetUserId)
            .then(() => {
                throw new Error('Expected NotFoundError but got success')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('fails if targetUser does not exist', () => {
        const validUserId = new ObjectId().toString()
        const invalidTargetUserId = new ObjectId().toString()

        return getAllGamesTargetUser(validUserId, invalidTargetUserId)
            .then(() => {
                throw new Error('Expected NotFoundError but got success')
            })
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('returns an empty array if targetUser has no games', () => {
        let userId, targetUserId

        return bcrypt.hash('123132123', 8)
            .then(hash => {
                return Promise.all([
                    User.create({ name: 'User1', username: 'user1', email: 'user1@example.com', password: hash }),
                    User.create({ name: 'TargetUser', username: 'targetuser', email: 'targetuser@example.com', password: hash })
                ])
            })
            .then(([user, targetUser]) => {
                userId = user._id
                targetUserId = targetUser._id

                // Call the function without creating any games
                return getAllGamesTargetUser(userId, targetUserId)
            })
            .then(games => {
                // Check the result
                expect(games).to.be.an('array').that.is.empty
            })
    })

    it('fails on invalid userId format', () => {
        let errorThrown

        try {
            getAllGamesTargetUser('invalid_user_id', new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid targetUserId format', () => {
        let errorThrown

        try {
            getAllGamesTargetUser(new ObjectId().toString(), 'invalid_target_user_id')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('targetUserId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})