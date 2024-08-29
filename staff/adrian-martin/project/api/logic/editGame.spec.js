import 'dotenv/config'
import mongoose, { Types } from "mongoose"
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { Game, User } from '../data/index.js'
import editGame from './editGame.js'
import { NotFoundError, SystemError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('editGame', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Game.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Game.deleteMany(), User.deleteMany()]))

    it('succeeds on edit Game', () => {
        const userId = new ObjectId()
        const gameId = new ObjectId()

        const user = new User({
            _id: userId,
            username: 'author_username',
            name: 'Author Name',
            email: 'author@example.com',
            password: 'password123'
        })

        return user.save()
            .then(() => {
                const game = new Game({
                    _id: gameId,
                    author: user._id,
                    title: 'Old Title',
                    image: 'https://example.com/image.png',
                    rating: 4.5,
                    hours: 10
                })
                return game.save()
            })
            .then(() => editGame(userId, gameId, { title: 'New Title' }))
            .then(updatedGame => {
                expect(updatedGame).to.exist
                expect(updatedGame.title).to.equal('New Title')
            })
    })

    it('fail on non-existing game', () => {
        const userId = new ObjectId()
        const nonExistentGameId = new ObjectId()

        try {
            editGame(userId, nonExistentGameId, { title: 'New Title' })
        } catch (error) {
            expect(error).to.be.an.instanceof(NotFoundError)
            expect(error.message).to.equal('Game not found')
        }
    })

    it('fail on invalid userId', () => {
        const invalidUserId = 'invalid-user-id'
        const gameId = new ObjectId()

        let errorThrown

        try {
            editGame(invalidUserId, gameId, { title: 'New Title' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fail on invalid gameId', () => {
        const userId = new ObjectId()
        const invalidGameId = 'invalid-game-id'

        let errorThrown

        try {
            editGame(userId, invalidGameId, { title: 'New Title' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('gameId is not valid')
        }
    })

    it('fail on invalid title', () => {
        const userId = new ObjectId()
        const gameId = new ObjectId()

        let errorThrown

        try {
            editGame(userId, gameId, { title: 123456789 })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fail on invalid image', () => {
        const userId = new ObjectId()
        const gameId = new ObjectId()

        let errorThrown

        try {
            editGame(userId, gameId, { image: 'invalid-url' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('image is not valid')
        }
    })

    it('fail on invalid rating', () => {
        const userId = new ObjectId()
        const gameId = new ObjectId()

        let errorThrown

        try {
            editGame(userId, gameId, { rating: 'invalid-rating' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('rating is not valid')
        }
    })

    it('fail on invalid hours', () => {
        const userId = new ObjectId()
        const gameId = new ObjectId()

        let errorThrown

        try {
            editGame(userId, gameId, { hours: 'invalid-hours' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('hours is not valid')
        }
    })

    after(() => Promise.all([Game.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})