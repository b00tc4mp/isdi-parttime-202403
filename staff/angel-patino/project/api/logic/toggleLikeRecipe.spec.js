import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'
import bcrypt from 'bcryptjs'

import { User, Recipe } from '../data/index.js'
import toggleLikeRecipe from './toggleLikeRecipe.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('toggleLikeRecipe', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Recipe.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]))

    it('succeeds in liking a recipe', () => {
        let user, recipe;

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'pepe',
                surname: 'luis',
                email: 'pepe@luis.com',
                username: 'pepeluis',
                password: hash
            }))
            .then(createdUser => {
                user = createdUser;
                return Recipe.create({
                    author: user._id,
                    title: 'Test Recipe',
                    thumbnail: 'https://example.com/image.jpg',
                    cookTime: 30,
                    ingredients: [{ name: 'Salt', quantity: 1, unit: 'tsp' }],
                    description: 'A test recipe.',
                    likes: []
                });
            })
            .then(createdRecipe => {
                recipe = createdRecipe;
                return toggleLikeRecipe(user._id.toString(), recipe._id.toString())
            })
            .then(() => Recipe.findById(recipe._id))
            .then(updatedRecipe => {
                expect(updatedRecipe.likes[0].toString()).to.equal(user._id.toString())
            })
    })

    it('succeeds in unliking a recipe', () => {
        let user, recipe;

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'pepe',
                surname: 'luis',
                email: 'pepe@luis.com',
                username: 'pepeluis',
                password: hash
            }))
            .then(createdUser => {
                user = createdUser
                return Recipe.create({
                    author: user._id,
                    title: 'Test Recipe',
                    thumbnail: 'https://example.com/image.jpg',
                    cookTime: 30,
                    ingredients: [{ name: 'Salt', quantity: 1, unit: 'tsp' }],
                    description: 'A test recipe.',
                    likes: []
                });
            })
            .then(createdRecipe => {
                recipe = createdRecipe;
                return toggleLikeRecipe(user._id.toString(), recipe._id.toString())
            })
            .then(() => Recipe.findById(recipe._id))
            .then(updatedRecipe => {
                expect(updatedRecipe.likes).to.have.lengthOf(1)
                expect(updatedRecipe.likes[0].toString()).to.equal(user._id.toString())
            })
    })

    it('fails when the user does not exist', () => {
        let errorThrown

        return Recipe.create({
            author: new ObjectId(),
            title: 'Test Recipe',
            thumbnail: 'https://example.com/image.jpg',
            cookTime: 30,
            ingredients: [{ name: 'Salt', quantity: 1, unit: 'tsp' }],
            description: 'A test recipe.'
        })
            .then(recipe => toggleLikeRecipe(new ObjectId().toString(), recipe._id.toString()))
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
                name: 'pepe',
                surname: 'luis',
                email: 'pepe@luis.com',
                username: 'pepeluis',
                password: hash

            }))
            .then(user => toggleLikeRecipe(user._id.toString(), new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('Recipe not found')
            })
    })

    it('fails with an invalid userId', () => {
        let errorThrown

        return Recipe.create({
            author: new ObjectId(),
            title: 'Test Recipe',
            thumbnail: 'https://example.com/image.jpg',
            cookTime: 30,
            ingredients: [{ name: 'Salt', quantity: 1, unit: 'tsp' }],
            description: 'A test recipe.'
        })
            .then(recipe => {
                try {
                    toggleLikeRecipe('invalidUserId', new ObjectId().toString())
                } catch (error) {
                    errorThrown = error

                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('userId is not valid')

                }
            })

    })

    it('fails whith an invalid recipeId', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'pepe',
                surname: 'luis',
                email: 'pepe@luis.com',
                username: 'pepeluis',
                password: hash

            }))
            .then(user => {
                try {
                    toggleLikeRecipe(user._id.toString(), 'invalidRecipeId')

                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('recipeId is not valid')
                }
            })
    })


    after(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]).then(() => mongoose.disconnect))
})