import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'
import { User, Recipe } from '../data/index.js'

import editRecipe from './editRecipe.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types

describe('editRecipe', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Recipe.deleteMany(), User.deleteMany()])))

    beforeEach(() => Promise.all([Recipe.deleteMany(), User.deleteMany()]))

    it('succeeds in editing an existing recipe', () => {
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Chef',
                surname: 'Master',
                email: 'chef@master.com',
                username: 'chefmaster',
                password: hash
            }))
            .then(user => {
                return Recipe.create({
                    author: user._id,
                    title: 'Original Recipe',
                    thumbnail: 'https://example.com/image.jpg',
                    cookTime: 30,
                    ingredients: [{ name: 'Salt', quantity: 1, unit: 'tsp' }],
                    description: 'A simple recipe.',
                    // ratings: 3
                }).then(recipe => ({ user, recipe }))
            })
            .then(({ user, recipe }) => editRecipe(user._id.toString(), recipe._id.toString(), {
                title: 'Updated Recipe',
                thumbnail: 'https://example.com/newimage.jpg',
                cookTime: 45,
                ratings: 4
            }))
            .then(updatedRecipe => {
                expect(updatedRecipe).to.exist
                expect(updatedRecipe.title).to.equal('Updated Recipe')
                expect(updatedRecipe.thumbnail).to.equal('https://example.com/newimage.jpg')
                expect(updatedRecipe.cookTime).to.equal(45)
                // expect(updatedRecipe.ratings).to.equal(4)
            })
    })

    it('fails when the recipe does not exist', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Chef',
                surname: 'Master',
                email: 'chef@master.com',
                username: 'chefmaster',
                password: hash
            }))
            .then(user => editRecipe(user._id.toString(), new ObjectId().toString(), {
                title: 'Updated Recipe'
            }))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('Recipe not found')
            })
    })

    it('fails when the user is not the author', () => {
        let errorThrown;

        return bcrypt.hash('12345678', 8)
            .then(hash => Promise.all([
                User.create({
                    name: 'Chef1',
                    surname: 'Master',
                    email: 'chef1@master.com',
                    username: 'chefmaster1',
                    password: hash
                }),
                User.create({
                    name: 'Chef2',
                    surname: 'Master',
                    email: 'chef2@master.com',
                    username: 'chefmaster2',
                    password: hash
                })
            ]))
            .then(([user1, user2]) => {
                return Recipe.create({
                    author: user1._id,
                    title: 'Original Recipe',
                    thumbnail: 'https://example.com/image.jpg',
                    cookTime: 30,
                    ingredients: [{ name: 'Salt', quantity: 1, unit: 'tsp' }],
                    description: 'A simple recipe.',
                    // rating: 3
                }).then(recipe => ({ user2, recipe }))
            })
            .then(({ user2, recipe }) => editRecipe(user2._id.toString(), recipe._id.toString(), {
                title: 'Updated Recipe'
            }))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('Recipe not found')
            })
    })

    it('fails with invalid userId', () => {
        let errorThrown

        try {
            editRecipe('invalidUserId', new ObjectId().toString(), { title: 'Updated Recipe' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails with invalid recipeId', () => {
        let errorThrown

        try {
            editRecipe(new ObjectId().toString(), 'invalidRecipeId', { title: 'Updated Recipe' })
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('recipeId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]).then(() => mongoose.disconnect()))
})
