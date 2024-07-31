import { Schema, model, Types } from 'mongoose'

const { ObjectId } = Types

const messageSchema = new Schema({
  sender: [
    {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  text: [
    {
      type: String,
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

const Chat = model('Chat', chatSchema)

export default Chat
