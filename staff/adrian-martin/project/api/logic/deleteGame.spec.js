import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import deleteGame from './deleteGame.js'
import { Game, User } from '../data/index.js'
import { expect } from 'chai'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

// npm run test-inspect

describe('deleteGame', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Game.deleteMany()])
    }))
    beforeEach(() => Promise.all([User.deleteMany(), Game.deleteMany()]))

    it('succeeds on delete game', () =>

        bcrypt.hash('123123123', 8)
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
                .then(game => ({ user, game }))
            )
            .then(({ user, game }) =>
                deleteGame(user.id, game.id)
            )
            .then(gameId =>
                Game.findById(gameId).then(deletedGame => {
                    expect(deletedGame).to.be.null
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return Game.create({
            author: new ObjectId().toString(),
            title: 'Hello Title',
            image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
            rating: 5,
            hours: 10
        })
            .then(game => deleteGame(new ObjectId().toString(), game.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing game', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then((hash) => User.create({
                name: 'Mocha',
                username: 'MochaChai',
                email: 'Mocha@Chai.com',
                password: hash
            })
                .then((user) => deleteGame(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('game not found')
            })
    })

    it('fails on non-match user', () => {
        let errorThrown;

        return bcrypt.hash('1234', 8)
            .then(hash => {
                const user = new User({
                    name: 'Mocha',
                    username: 'MochaChai',
                    email: 'Mocha@Chai.com',
                    password: hash
                });
                const game = new Game({
                    author: user.id,
                    title: 'Title',
                    image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
                    rating: 5,
                    hours: 10
                });
                return Promise.all([user.save(), game.save()])
                    .then(([savedUser, savedGame]) => {
                        const nonOwnerUserId = new User().id.toString()
                        return deleteGame(nonOwnerUserId, savedGame.id.toString());
                    })
                    .catch(error => errorThrown = error);
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    it('fails on invalid gameId', () => {
        let errorThrown

        return Game.create({
            author: new ObjectId().toString(),
            title: 'Hello Title',
            image: 'https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
            rating: 5,
            hours: 10
        })
            .then(game => deleteGame(new ObjectId().toString(), game.id))
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(() => mongoose.disconnect()))
})