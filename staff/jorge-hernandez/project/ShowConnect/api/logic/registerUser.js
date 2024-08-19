import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (
  name,
  artisticName,
  discipline,
  city,
  description,
  email,
  image,
  video,
  password,
  passwordRepeat
) => {
  validate.name(name)
  validate.name(artisticName, 'artisticName')
  validate.email(email)
  validate.text(discipline, 'discipline')
  validate.text(city, 'city')
  validate.text(description, 'description')
  validate.url(image, 'image')
  validate.url(video, 'video')
  validate.password(password)
  validate.passwordsMatch(password, passwordRepeat)

  return User.findOne({ email })
    .catch((error) => {
      throw new SystemError(error.message)
    })
    .then((user) => {
      if (user) {
        throw new DuplicityError('User already exists')
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
            image: image,
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
