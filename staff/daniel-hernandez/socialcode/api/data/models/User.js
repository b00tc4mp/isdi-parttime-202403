import { Schema, model } from "mongoose";
import { NAME_REGEX, EMAIL_REGEX, USERNAME_REGEX } from "com/validate.js";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    match: [NAME_REGEX, "Name is not valid"],
  },
  surname: {
    type: String,
    required: [true, "Please provide a surname"],
    trim: true,
    match: [NAME_REGEX, "Surname is not valid"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [EMAIL_REGEX, "Please provide a valid email"],
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    match: [USERNAME_REGEX, "Please provide a valid username"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 4,
  },
});

const User = model("User", UserSchema);

export default User;
