import { Schema, model } from "mongoose"

const user = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,

  },
  adress: {
    type: String,

  },
  taxId: {
    type: String,
    unique: true,

  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,

  },
  bankAccount: {
    type: String,

  },
  companyLogo: {
    type: String
  },
  role: {
    type: String,

  },
  password: {
    type: String,
    required: true
  }
})

const User = model("User", user)

export default User