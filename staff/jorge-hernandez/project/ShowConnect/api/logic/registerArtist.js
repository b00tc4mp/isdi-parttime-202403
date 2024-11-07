import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerArtist = async (
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

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new DuplicityError('User already exists')
    }

    const passHash = await bcrypt.hash(password, 8)

    const newUser = {
      name,
      artisticName,
      discipline,
      city,
      description,
      email,
      image,
      video,
      password: passHash,
      role: 'artist',
    }

    await User.create(newUser)
  } catch (error) {
    if (error instanceof DuplicityError) {
      throw error
    }
    throw new SystemError(error.message)
  }
}

export default registerArtist
