import 'dotenv/config'
import mongoose from 'mongoose'
import { expect } from 'chai'

import { Chat } from '../data/index.js'
import findExistingChat from './findExistingChat.js'
import { SystemError, CredentialsError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('findExistingChat', () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Chat.deleteMany()))

  beforeEach(() => Chat.deleteMany())

  it('succeeds when an existing chat with the correct participants is found', () => {
    return Chat.create({
      participants: ['66c63ae6e68d96e534010ef6', '66c63a98e68d96e534010eeb'],
    })
      .then(() =>
        findExistingChat('66c63ae6e68d96e534010ef6', '66c63a98e68d96e534010eeb')
      )
      .then((result) => {
        expect(result).to.exist
        expect(result).to.have.property('_id')
        const participants = result.participants.map((id) => id.toString())
        expect(participants).to.include.members([
          '66c63ae6e68d96e534010ef6',
          '66c63a98e68d96e534010eeb',
        ])
      })
  })

  it('fails when no chat with the participants is found', () => {
    return findExistingChat(
      '66c6d627214c20c21039d564',
      '66c63a98e68d96e534010eeb'
    ).catch((error) => {
      expect(error).to.be.instanceOf(CredentialsError)
      expect(error.message).to.equal('Chat not found')
    })
  })

  after(() => Chat.deleteMany().then(() => mongoose.disconnect()))
})
