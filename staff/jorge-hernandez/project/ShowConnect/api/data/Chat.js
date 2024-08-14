import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const chatSchema = new Schema({
  participants: [
    {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: ObjectId,
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
