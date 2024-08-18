// import "dotenv/config"
// import mongoose, { Types } from "mongoose"
// import bcrypt from "bcryptjs"
// import { expect } from "chai"

// import { Task, User } from "../data/index.js"

// import createTask from "./createTask.js"
// import { NotFoundError, ContentError } from "com/errors.js"

// const { MONGODB_URL_TEST } = process.env
// const { ObjectId } = Types

// describe("createTask", () => {
//     before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
//         return Promise.all([User.deleteMany(), Task.deleteMany()])
//     }))

//     beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

//     it('succeds on create task', () =>
//         bcrypt.hash('1234', 8)
//             .then(hash => {
//                 return User.create({
//                     name: "carla",
//                     username: "CASA",
//                     email: "carla@email.es",
//                     password: hash
//                 })
//                     .then(user => {
//                         return createTask(user.id.toString(), user.id.toString(), "test", "description test")
//                     })
//                     .then(() => Task.findOne())
//                     .then(task => {
//                         expect(task.parent).to.equal(user.id)
//                         expect(task.assignee).to.equal(user.id)
//                         expect(task.title).to.equal("test")
//                         expect(task.description).to.equal("description test")
//                         expect(task.date).to.be.an.instanceOf(Date)
//                     })
//             })
//     )

//     // it("fails on non-exsiting user", () => {
//     //     let errorThrown

//     //     return createPost(new ObjectId().toString(), "Hello title", "https://media.giphy.com/media/2kXOYTdyGPbIBISFn5/giphy.gif?cid=6c09b9525munegsuq607a67vn2oks57tip5c8ptumlx95ba7&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "hello description", [])
//     //         .catch(error => errorThrown = error)
//     //         .finally(() => {
//     //             expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//     //             expect(errorThrown.message).to.equal("User not found")
//     //         })
//     // })

//     // it("fails on invalid userId", () => {
//     //     let errorThrown
//     //     try {
//     //         createPost(1234, "Hello title")
//     //     errorThrown = error
//     // } finally {
//     //         expect(errorThrown).to.be.instanceOf(ContentError)
//     //         expect(errorThrown.message).to.equal("userId is not valid")
//     //     }
//     // })

//     // it("fails on invalid title", () => {
//     //     let errorThrown
//     //     try {
//     //         createTask(new ObjectId().toString(), 1234, "hello description")
//     //     } catch (error) {
//     //         errorThrown = error
//     //     } finally {
//     //         expect(errorThrown).to.be.instanceOf(ContentError)
//     //         expect(errorThrown.message).to.equal("title is not valid")
//     //     }
//     // })


//     // it("fails on invalid description", () => {
//     //     let errorThrown
//     //     try {
//     //         createTask(new ObjectId().toString(), "Hello Title", 7777)
//     //     } catch (error) {
//     //         errorThrown = error
//     //     } finally {
//     //         expect(errorThrown).to.be.instanceOf(ContentError)
//     //         expect(errorThrown.message).to.equal("escription is not valid")
//     //     }
//     // })


//     after(() => Task.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
// })