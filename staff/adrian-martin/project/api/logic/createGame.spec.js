import 'dotenv/config'
import mongoose, { Types } from "mongoose"
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Game, User } from '../data/index.js'

import createGame from './createGame.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

// npm run test-inspect

describe('createGame', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Game.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Game.deleteMany(), User.deleteMany()]))

    it('succeeds on existing user', () => {
        bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => createGame(user.id, 'Test Game', 'https://example.com/game.jpg', 10, 10))
            .then(() => Game.findOne())
            .then(game => {
                expect(game.author.toString()).to.equal(user.id)
                expect(game.title).to.equal('Test Game')
                expect(game.image).to.equal('https://example.com/game.jpg')
                expect(game.rating).to.equal(10)
                expect(game.hours).to.equal(10)
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return createGame(new ObjectId().toString(), 'Test Game', 'https://example.com/game.jpg', 10, 10)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createGame('iñaki', 'Test Game', 'https://example.com/game.jpg', 10, 10)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid title', () => {
        let errorThrown

        try {
            createGame(new ObjectId().toString(), 123456789, 'https://example.com/game.jpg', 10, 10)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid image', () => {
        let errorThrown

        try {
            createGame(new ObjectId().toString(), 'Title', 'iñaki', 10, 10)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('image is not valid')
        }
    })

    it('fails on invalid rating', () => {
        let errorThrown

        try {
            createGame(new ObjectId().toString(), 'Title', 'https://example.com/game.jpg', 'diablo', 10)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('rating is not valid')
        }
    })

    it('fails on invalid hours', () => {
        let errorThrown

        try {
            createGame(new ObjectId().toString(), 'Title', 'https://example.com/game.jpg', 10, 'diablo')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('hours is not valid')
        }
    })
})