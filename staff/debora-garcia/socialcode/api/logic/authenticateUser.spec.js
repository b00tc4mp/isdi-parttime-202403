import "dotenv/config"
import { User } from "../data/index.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import { expect } from "chai"

import authenticateUser from "./authenticateUser.js"
import { CredentialsError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

//con mocha no hay que importar nada. MOCHA ejecuta
// describe("authenticateUser", () => {
//     //esto devuelve una promesa.Hasta que no se conecta no se ejecuta la prueba
//     before(() => mongoose.connect(MONGODB_URL))
//     // it tambien devuelve una promesa, por lo que se espera hasta que termine la promesa, y retornara la caden de promesas
//     it('succeeds when user already exsist', () =>
//         authenticateUser("LionLeo", "1234")
//             .then(userId => {
//                 expect(userId).to.be.a.string
//                 expect(userId).to.have.lengthOf(24)
//             })
//     )

//     // al terminar todas las pruebas desconecta. 
//     after(() => mongoose.disconnect())
// })

//si la promesa fallara el test lo recoge
//CHAI comprueba los resultados

describe("authenticateUser", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    // antes de cada test se limpiara la base de datos, asi los test seran independientes
    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', () =>
        bcrypt.hash("1234", 8)
            .then(hash => User.create({ username: "meloinvento", email: "meinvento@gmail.com", password: hash }))
            .then(() => authenticateUser("meloinvento", "1234"))
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    it("fails on non-existing user", () => {
        let errorThrown

        authenticateUser("nonexistentuser", "1234")
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it('fails on existing user by wrong password', () => {
        let errorThrown

        return bcrypt.hash("12346", 8)
            .then(hash => User.create({ username: "meloinvento", email: "meinvento@gmail.com", password: hash }))
            .then(() => authenticateUser("meloinvento", "1234"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal("wrong password")
            })
    })

    it("fails on invalid username", () => {
        // la regex es un error syncrono por lo que usamos try catch
        let errorThrown

        try {
            authenticateUser(123456, "1234")

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("username is not valid")
        }
    })

    it("fails on invalid password", () => {
        let errorThrown

        try {
            authenticateUser("test", "123")

        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("password is not valid")
        }

    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})

// el test tambien detecta si has puesto un mensaje de error diferente del test
// por ejemplo si escribimos mal en la logica "wrong passrd" lo detecta
// finally es una condicion que tiene que pasar si o si el try catch, ya que en el caso de que se produczcan errores asyncro, es una manera de capturarlos
// creamos variable errorThrown para poder capturar el error si se produce
// usamos return dond no hay try,catch ya que es funcion multilinea


