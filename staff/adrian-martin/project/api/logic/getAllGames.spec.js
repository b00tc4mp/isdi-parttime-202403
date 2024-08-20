import 'dotenv/config'
import mongoose, { get, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import getAllGames from './getAllGames.js'
import { Game, User } from '../data/index.js'
import { expect } from 'chai'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

// npm run test-inspect

describe('getAllGames', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Game.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Game.deleteMany(), User.deleteMany()]))

    it('succeeds on get all postGame', () => {
        return bcrypt.hash('123456789', 8)
            .then(hash => User.create({
                name: 'Mocha',
                username: 'MochaChai',
                email: 'Mocha@Chai.com',
                password: hash
            }))
            .then(user => Game.create({
                author: user.id,
                title: 'Title',
                image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                rating: 5,
                hours: 10
            })
                .then(() => user)
            )
            .then(user => getAllGames(user.id, 1, 2))
            .then(game => {
                expect(game).to.be.an('array')
                expect(game).to.have.lengthOf(1)
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return getAllGames(new ObjectId().toString(), 1, 2)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getAllGames('iñaki', 1, 2)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).equal('userId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})
