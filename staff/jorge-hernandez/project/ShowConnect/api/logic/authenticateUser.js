import { User } from '../data/index.js'
import { CredentialsError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const authenticateUser = async (email, password) => {
  validate.email(email)
  validate.password(password)

  try {
    const user = await User.findOne({ email }).lean()

    if (!user) {
      throw new CredentialsError('user not found')
    }

    const credentials = await bcrypt.compare(password, user.password)

    if (!credentials) {
      throw new CredentialsError('wrong password')
    }

    return {
      userId: user._id.toString(),
      role: user.role,
    }
  } catch (error) {
    if (error instanceof CredentialsError) {
      throw error
    }

    console.error(error.message)
    throw new SystemError(error.message)
  }
}

export default authenticateUser
