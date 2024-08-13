import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const chatSchema = new Schema({
  users: [
    {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  messages: [
    //TODO ARRAY DE IDS DE MENSAJES
    {
      type: String,
      required: true,
      ref: 'Message',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

const Chat = model('Chat', chatSchema)

export default Chat
