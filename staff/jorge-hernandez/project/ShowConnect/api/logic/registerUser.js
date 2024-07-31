import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
// import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (
  name,
  artisticName,
  discipline,
  city,
  description,
  email,
  images,
  video,
  password,
  passwordRepeat
) => {
  // TODO validates
  return User.findOne({ email })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (user) {
        throw new DuplicityError('Usuario ya registrado')
      }

      return bcrypt
        .hash(password, 8)
        .catch((error) => {
          throw new SystemError(error.message)
        })
        .then((hash) => {
          const newUser = {
            name: name,
            artisticName: artisticName,
            discipline: discipline,
            city: city,
            description: description,
            email: email,
            images: images,
            video: video,
            password: hash,
            role: 'artist',
          }

          return User.create(newUser)
            .catch((error) => {
              throw new SystemError(error.message)
            })
            .then(() => {})
        })
    })
}

export default registerUser
