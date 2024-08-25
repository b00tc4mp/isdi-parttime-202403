import 'dotenv/config'
import mongoose, { Types } from "mongoose"
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { Game, User } from '../data/index.js'
import editGame from './editGame.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('editGame', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Game.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Game.deleteMany(), User.deleteMany()]))

    // it('succeeds when updating an existing game with valid fields', () => {
    //     let userId, gameId

    //     return bcrypt.hash('123456', 8)
    //         .then(hash => User.create({ name: 'User', username: 'user', email: 'user@example.com', password: hash }))
    //         .then(user => {
    //             userId = user._id
    //             return Game.create({
    //                 title: 'Old Title',
    //                 hours: 10,
    //                 rating: 4.0,
    //                 image: 'old-image.png',
    //                 author: userId
    //             })
    //         })
    //         .then(game => {
    //             gameId = game._id
    //             return editGame(userId, gameId, {
    //                 title: 'New Title',
    //                 hours: 20,
    //                 rating: 4.5,
    //                 image: 'new-image.png'
    //             })
    //         })
    //         .then(updatedGame => {
    //             expect(updatedGame).to.have.property('title', 'New Title')
    //             expect(updatedGame).to.have.property('hours', 20)
    //             expect(updatedGame).to.have.property('rating', 4.5)
    //             expect(updatedGame).to.have.property('image', 'new-image.png')
    //             expect(updatedGame).to.have.property('_id').that.equals(gameId.toString())
    //         })
    // })

    // it('fails when the game does not exist', () => {
    //     const validUserId = new ObjectId().toString()
    //     const invalidGameId = new ObjectId().toString()

    //     return editGame(validUserId, invalidGameId, { title: 'Some Title' })
    //         .then(() => {
    //             throw new Error('Expected NotFoundError but got success')
    //         })
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(NotFoundError)
    //             expect(error.message).to.equal('Game not found')
    //         })
    // })

    // it('fails when invalid userId or gameId is provided', () => {
    //     let errorThrown

    //     try {
    //         editGame('invalidUserId', new ObjectId().toString(), { title: 'Some Title' })
    //     } catch (error) {
    //         errorThrown = error
    //     } finally {
    //         expect(errorThrown).to.be.an.instanceof(SystemError)
    //         expect(errorThrown.message).to.include('userId')
    //     }

    //     try {
    //         editGame(new ObjectId().toString(), 'invalidGameId', { title: 'Some Title' })
    //     } catch (error) {
    //         errorThrown = error
    //     } finally {
    //         expect(errorThrown).to.be.an.instanceof(SystemError)
    //         expect(errorThrown.message).to.include('gameId')
    //     }
    // })

    // it('fails on invalid title', () => {
    //     let userId, gameId

    //     return bcrypt.hash('123456', 8)
    //         .then(hash => User.create({ name: 'User', username: 'user', email: 'user@example.com', password: hash }))
    //         .then(user => {
    //             userId = user._id
    //             return Game.create({
    //                 title: 'Valid Title',
    //                 hours: 10,
    //                 rating: 4.0,
    //                 image: 'valid-image.png',
    //                 author: userId
    //             })
    //         })
    //         .then(game => {
    //             gameId = game._id
    //             return editGame(userId, gameId, { title: '' })
    //         })
    //         .then(() => {
    //             throw new Error('Expected SystemError but got success')
    //         })
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(SystemError)
    //             expect(error.message).to.include('title')
    //         })
    // })

    // it('fails on invalid URL for image', () => {
    //     let userId, gameId

    //     return bcrypt.hash('123456', 8)
    //         .then(hash => User.create({ name: 'User', username: 'user', email: 'user@example.com', password: hash }))
    //         .then(user => {
    //             userId = user._id
    //             return Game.create({
    //                 title: 'Valid Title',
    //                 hours: 10,
    //                 rating: 4.0,
    //                 image: 'valid-image.png',
    //                 author: userId
    //             })
    //         })
    //         .then(game => {
    //             gameId = game._id
    //             return editGame(userId, gameId, { image: 'invalid-url' })
    //         })
    //         .then(() => {
    //             throw new Error('Expected SystemError but got success')
    //         })
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(SystemError)
    //             expect(error.message).to.include('image')
    //         })
    // })

    // it('fails on invalid rating', () => {
    //     let userId, gameId

    //     return bcrypt.hash('123456', 8)
    //         .then(hash => User.create({ name: 'User', username: 'user', email: 'user@example.com', password: hash }))
    //         .then(user => {
    //             userId = user._id
    //             return Game.create({
    //                 title: 'Valid Title',
    //                 hours: 10,
    //                 rating: 4.0,
    //                 image: 'valid-image.png',
    //                 author: userId
    //             })
    //         })
    //         .then(game => {
    //             gameId = game._id
    //             return editGame(userId, gameId, { rating: 'invalid-rating' })
    //         })
    //         .then(() => {
    //             throw new Error('Expected SystemError but got success')
    //         })
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(SystemError)
    //             expect(error.message).to.include('rating')
    //         })
    // })

    // it('fails on invalid hours', () => {
    //     let userId, gameId

    //     return bcrypt.hash('123456', 8)
    //         .then(hash => User.create({ name: 'User', username: 'user', email: 'user@example.com', password: hash }))
    //         .then(user => {
    //             userId = user._id
    //             return Game.create({
    //                 title: 'Valid Title',
    //                 hours: 10,
    //                 rating: 4.0,
    //                 image: 'valid-image.png',
    //                 author: userId
    //             })
    //         })
    //         .then(game => {
    //             gameId = game._id
    //             return editGame(userId, gameId, { hours: 'invalid-hours' })
    //         })
    //         .then(() => {
    //             throw new Error('Expected SystemError but got success')
    //         })
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(SystemError)
    //             expect(error.message).to.include('hours')
    //         })
    // })

    after(() => Promise.all([Game.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})