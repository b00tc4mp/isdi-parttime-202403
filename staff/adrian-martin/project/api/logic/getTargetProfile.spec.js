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

        // Crea un usuario válido
        return bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => {
                userId = user._id

                // Verifica que el usuario ha sido creado correctamente
                return User.findById(userId).lean()
            })
            .then(user => {
                expect(user).to.be.an('object')
                expect(user).to.have.property('name', 'Mocha')
                expect(user).to.have.property('username', 'MochaChai')
                expect(user).to.have.property('email', 'Mocha@Chai.com')
                expect(user.password).to.not.equal('123132123') // La contraseña en la base de datos es el hash, no la contraseña en texto plano
            })
    })

    // it('succeeds on existing targetProfileId', () => {
    //     let userId, targetProfileId

    //     // Crea un usuario y un perfil objetivo válidos
    //     return bcrypt.hash('123132123', 8)
    //         .then(hash => User.create({ name: 'User', username: 'UserName', email: 'User@Email.com', password: hash }))
    //         .then(user => {
    //             userId = user._id

    //             return User.create({ name: 'Target', username: 'TargetProfile', email: 'Target@Profile.com', password: hash })
    //         })
    //         .then(targetProfile => {
    //             targetProfileId = targetProfile._id

    //             // Llama a la función con el perfil objetivo existente
    //             return getTargetProfile(userId, targetProfileId)
    //         })
    //         .then(result => {
    //             // Verifica los resultados del perfil objetivo
    //             expect(result).to.be.an('object')
    //             expect(result).to.have.property('id').that.equals(targetProfileId.toString())
    //             expect(result).to.have.property('name', 'Target')
    //             expect(result).to.have.property('username', 'TargetProfile')
    //             expect(result).to.have.property('email', 'Target@Profile.com')
    //         })
    // })

    it('fails on non-existing user', () => {
        const invalidUserId = new ObjectId().toString() // ID de usuario inválido
        const targetProfileId = new ObjectId().toString() // ID de perfil objetivo válido

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

        // Crea un usuario válido
        return bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => {
                userId = user._id

                // Llama a la función con un perfil objetivo inválido
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