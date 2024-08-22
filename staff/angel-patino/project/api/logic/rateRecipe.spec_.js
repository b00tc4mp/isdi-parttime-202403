import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User, Recipe } from '../data/index.js'
import rateRecipe from './rateRecipe.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('rateRecipe', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Recipe.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]))

    it('succeeds in adding a new rating to a recipe', () => {
        let user, recipe

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'mocha',
                surname: 'chai',
                email: 'mocha@chai.com',
                username: 'mochachai',
                password: hash
            }))
            .then(createdUser => {
                user = createdUser
                return Recipe.create({
                    author: user.id,
                    title: 'Tortela',
                    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
                    cookTime: 55,
                    ingredients: [{ name: 'huevos', quantity: 2, unit: 'ml' }],
                    description: 'mix',
                    ratings: []
                })
            })
            .then(createdRecipe => {
                recipe = createdRecipe
                return rateRecipe(user._id.toString(), recipe._id.toString(), 4)
            })
            .then(() => Recipe.findById(recipe._id))
            .then(updateRecipe => {
                expect(updateRecipe.ratings).to.have.lengthOf(1)
                expect(updateRecipe.ratings[0].value).to.equal(4)
                expect(updateRecipe.ratings[0].user.toString()).to.equal(user._id.toString())
            })
    })

    it('succeeds in updating an existing rating for a recipe', () => {
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'mocha',
                surname: 'chai',
                email: 'mocha@chai.com',
                username: 'mochachai',
                password: hash
            }))
            .then(createdUser => {
                user = createdUser;
                return Recipe.create({
                    author: user.id,
                    title: 'Tortela',
                    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
                    cookTime: 55,
                    ingredients: [{ name: 'huevos', quantity: 2, unit: 'ml' }],
                    description: 'mix',
                    ratings: [{ user: user._id, value: 3 }]
                })
            })
            .then(createdRecipe => {
                recipe = createdRecipe;
                return rateRecipe(user._id.toString(), recipe._id.toString(), 5)
            })
            .then(() => Recipe.findById(recipe._id))
            .then(updateRecipe => {
                expect(updateRecipe.ratings).to.have.lengthOf(1)
                expect(updateRecipe.ratings[0].value).to.equal(5)
                expect(updateRecipe.ratings[0].user.toString()).to.equal(user._id.toString())
            })
    })

    it('fails when the user does not exist', () => {
        let errorThrown

        return Recipe.create({
            author: new ObjectId(),
            title: 'Test',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
            cookTime: 30,
            ingredients: [{ name: 'salt', quantity: 1, unit: 'tsp' }],
            description: 'A test'
        })
            .then(recipe => rateRecipe(new ObjectId().toString(), recipe._id.toString(), 4))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails when the recipe does not exist', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'mocha',
                surname: 'chai',
                email: 'mocha@chai.com',
                username: 'mochachai',
                password: hash
            }))
            .then(user => rateRecipe(user._id.toString(), new ObjectId().toString(), 4))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown).to.equal('Recipe not found')
            })
    })

    it('fails with an invalid rating', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'mocha',
                surname: 'chai',
                email: 'mocha@chai.com',
                username: 'mochachai',
                password: hash
            }))
            .then(user => Recipe.create({
                author: user._id,
                title: 'Test',
                thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
                cookTime: 30,
                ingredients: [{ name: 'salt', quantity: 1, unit: 'tsp' }],
                description: 'A test'
            }).then(recipe => ({ user, recipe })))
            .then(({ user, recipe }) => {
                try {
                    rateRecipe(user._id.toString(), recipe._id.toString(), 6)
                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('rating is not valid. It must be a number between 1 and 5.')
                }
            })
    })



    after(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]).then(() => mongoose.disconnect()))
})