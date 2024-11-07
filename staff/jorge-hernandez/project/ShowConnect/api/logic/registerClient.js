import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerClient = async (name, email, password, passwordRepeat) => {
  validate.name(name)
  validate.email(email)
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  try {
    const user = await User.findOne({ email })

    if (user) {
      throw new DuplicityError('User already exists')
    }

    const passHash = await bcrypt.hash(password, 8)

    const newUser = {
      name: name,
      email: email,
      password: passHash,
      role: 'client',
    }
    await User.create(newUser)
  } catch (error) {
    if (error instanceof DuplicityError) {
      throw error
    }
    throw new SystemError(error.message)
  }
}

export default registerClient
